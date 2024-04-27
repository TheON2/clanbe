import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { postid, author, text } = body.postData;

  try {
    // MongoDB에 데이터 저장

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    try {
      const post = await PostModel.findOne({ _id: postid });

      const newComment = { author, text };
      post.comments.push(newComment);
      await post.save();

      console.log("댓글 저장 성공");
      return new Response(
        JSON.stringify({
          message: "댓글 업로드 성공",
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("댓글 저장 실패:", error);
      // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
      console.error(error);
    }
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
