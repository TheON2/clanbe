"use server";

import { updatePostData, uploadPostData } from "@/service/posts";
import mongoose from "mongoose";
import PostModel from "@/models/post";
import SupportModel from "@/models/support";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let {
    htmlContent,
    title,
    description,
    category,
    thumbnail,
    featured,
    fileName,
    noticed,
    postId,
    supporter,
    type,
    amount,
  } = body.postData;

  console.log(body);

  try {
    const fileUrl = await updatePostData(fileName, htmlContent);

    // MongoDB에 데이터 저장
    console.log("업데이트 라우트 진입함");

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error("게시글을 찾을 수 없음");
    }

    // 필요한 필드를 업데이트합니다.
    post.title = title;
    post.description = description;
    post.category = category;
    post.thumbnail = thumbnail;
    post.featured = featured;
    post.noticed = noticed;
    post.fileUrl = fileUrl;

    // markModified를 호출하여 Mongoose에게 featured와 noticed 필드가 변경되었음을 알립니다.
    post.markModified("featured");
    post.markModified("noticed");

    if (category === "support") {
      const supportData = await SupportModel.findOne({ postid: postId });
      console.log(supportData)
      if (!supportData) {
        throw new Error("후원기록을 찾을 수 없음");
      }
      supportData.type = type;
      supportData.email = supporter;
      supportData.amount = amount;

      await supportData?.save();
    }
    await post.save();

    console.log("게시글 수정 성공");

    return new Response(JSON.stringify({ message: "게시글 수정 성공" }), {
      status: 200,
      statusText: post._id.toString(),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
