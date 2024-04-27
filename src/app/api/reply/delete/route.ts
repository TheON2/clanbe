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

  let { fileName, postId } = body.postData;

  console.log(body.postData);

  try {
    await deletePostData(fileName);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return new Response(
          JSON.stringify({ message: "게시글을 찾을 수 없음" }),
          {
            status: 401,
          }
        );
    }

    console.log("게시글 삭제 성공");
    return new Response(JSON.stringify({ message: "게시글 삭제 성공" }), {
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
