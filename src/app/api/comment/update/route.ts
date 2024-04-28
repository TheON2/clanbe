"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { updatePostData, uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { postid, commentid, author, editedText } = body.postData;

  try {

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const post = await PostModel.findById(postid);
    if (!post) {
      return new Response(JSON.stringify({ message: "게시글이 없습니다" }), {
      status: 401,
    });
    }

    const comment = post.comments.id(commentid);
    if (!comment) {
      return new Response(JSON.stringify({ message: "댓글이 없습니다" }), {
      status: 401,
    });
    }

   // 댓글 내용 업데이트
    comment.text = editedText;

    // 변경사항 저장
    await post.save();


    console.log("댓글 수정 성공");

    return new Response(JSON.stringify({ message: "댓글 수정 성공" }), {
      status: 200,
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
