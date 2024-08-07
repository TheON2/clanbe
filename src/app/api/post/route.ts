import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";
import { revalidateTag } from "next/cache";
import UserModel from "@/models/user";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    // 데이터베이스에서 모든 게시글을 검색
    const post = await PostModel.findOne({ _id: body.slug }); // 모든 게시글을 검색

    const {
      fileUrl,
      title,
      description,
      category,
      author,
      createdAt,
      _id,
      featured,
      thumbnail,
      noticed,
    } = post;

    const user = await UserModel.findOne({ email: author });

    return new Response(
      JSON.stringify({
        title,
        category,
        date: createdAt,
        description,
        featured,
        fileUrl,
        author,
        authorNickName: user ? user.nickname : null,
        thumbnail,
        noticed,
        postId: _id.toString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts from MongoDB", error);
    throw new Error("Error fetching posts from MongoDB");
  }
}
