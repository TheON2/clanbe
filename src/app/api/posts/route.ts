import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function GET(req: Request, res: Response) {
  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    // 데이터베이스에서 모든 게시글을 검색
    const posts = await PostModel.find({}); // 모든 게시글을 검색
    console.log(posts);

    const transformedPosts = posts.map((post) => {
      return {
        ...post.toObject(),
        _id: post._id.toString(), // ObjectId를 문자열로 변환
      };
    });
     return new Response(JSON.stringify({ data: transformedPosts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts from MongoDB", error);
    throw new Error("Error fetching posts from MongoDB");
  }
}
