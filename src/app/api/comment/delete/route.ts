import { NextApiRequest, NextApiResponse } from "next";
import {
  deletePostData,
  updatePostData,
  uploadPostData,
} from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { postid, commentid } = body;


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
     // commentid를 이용하여 댓글 직접 제거
    const commentIndex = post.comments.findIndex((c: any) => c.id === commentid);
    if (commentIndex === -1) {
      return new Response(JSON.stringify({ message: "댓글이 없습니다" }), {
      status: 401,
    });
    }

    post.comments.splice(commentIndex, 1); // 배열에서 댓글 제거
    await post.save(); // 변경사항 저장

    console.log("댓글 삭제 성공");
    return new Response(JSON.stringify({ message: "댓글 삭제 성공" }), {
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
