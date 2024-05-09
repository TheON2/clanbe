import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";
import SupportModel from "@/models/support";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let {
    htmlContent,
    noticed,
    title,
    description,
    category,
    thumbnail,
    featured,
    author,
    view,
    supporter,
    type,
    amount,
  } = body.postData;

  try {
    const fileUrl = await uploadPostData(htmlContent);

    // MongoDB에 데이터 저장

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    if (thumbnail === "")
      thumbnail =
        "https://theon2blog.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20230607_124653702_02.png";
    const post = new PostModel({
      title,
      description,
      category,
      thumbnail,
      featured,
      fileUrl,
      author,
      noticed,
      view,
    });

    
    const savedPost = await post.save();
    
    if (category === "support") {
      try {
        const supportData = new SupportModel({
          type,
          email:supporter,
          amount,
          postid:savedPost._id,
        });
        supportData.save();
      } catch (error: unknown) {
        console.error("후원내역 저장 실패:", error);
      }
    }

    console.log("게시글 저장 성공");
    return new Response(
      JSON.stringify({
        message: savedPost._id.toString(),
      }),
      {
        status: 200,
        statusText: savedPost._id.toString(),
      }
    );
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
