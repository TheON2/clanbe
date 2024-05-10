"use server";

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
import { revalidateTag } from "next/cache";
import SupportModel from "@/models/support";

export async function DELETE(req: Request, res: Response) {
  const body = await req.json();

  let { fileName } = body.postData;

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const deletedPost = await PostModel.findByIdAndDelete(body.postData._id);

    if (!deletedPost) {
      return new Response(
        JSON.stringify({ message: "게시글을 찾을 수 없음" }),
        {
          status: 401,
        }
      );
    }
    const deletedSupport = await SupportModel.findOneAndDelete({
     postid: body.postData._id,  // postId를 사용하도록 수정
   });
   if (!deletedSupport) {
     return new Response(
       JSON.stringify({ message: "후원목록을 찾을 수 없음" }),
       {
         status: 401,
       }
     );
    }
    
    await deletePostData(fileName);

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
