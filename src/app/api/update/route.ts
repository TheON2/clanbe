import { NextApiRequest, NextApiResponse } from "next";
import { updatePostData, uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";

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
    postId,
  } = body.postData;

  console.log(body.postData);

  try {
    const fileUrl = await updatePostData(fileName, htmlContent);

    // MongoDB에 데이터 저장
    console.log("업데이트 라우트 진입함");

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: body.postData.postId },
      {
        title,
        description,
        category,
        thumbnail,
        featured,
        fileUrl,
      },
      { new: true }
    );

    if (!updatedPost) {
      throw new Error("게시글을 찾을 수 없음");
    }

    console.log(updatedPost);

    console.log("게시글 수정 성공");
    return new Response(JSON.stringify({ message: "게시글 수정 성공" }), {
      status: 200,
      statusText: updatedPost._id.toString(),
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
