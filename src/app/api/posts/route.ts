"use server";

import mongoose from "mongoose";
import PostModel from "@/models/post";
import UserModel from "@/models/user"; // 유저 모델 가져오기

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    let posts = [];
    if (body.category === "allposts") {
      posts = await PostModel.find({});
    } else if (body.category === "notice") {
      posts = await PostModel.find({ noticed: true });
    } else if (body.category === "main") {
      // "main" 카테고리에 대한 로직 처리
      const noticedPosts = await PostModel.find({ noticed: true })
        .sort({ createdAt: -1 })
        .limit(6); // noticed가 true인 게시물 최신 6개

      const regularPosts = await PostModel.find({ noticed: false })
        .sort({ createdAt: -1 })
        .limit(10); // noticed가 false인 게시물 최신 10개

      posts = [...noticedPosts, ...regularPosts];
    } else if (body.category === "tear") {
      // "tear" 카테고리에 대한 로직 처리
      posts = await PostModel.find({
        $or: [
          { category: "beforetear" },
          { category: "aftertear" },
          { category: "notice" },
        ],
      });
    } else {
      posts = await PostModel.find({
        $or: [{ category: body.category }, { category: "notice" }],
      });
    }

    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const postObject = post.toObject();
        const author = await UserModel.findOne({ email: postObject.author });
        return {
          ...postObject,
          _id: post._id.toString(), // ObjectId를 문자열로 변환
          authorNickName: author ? author.nickname : null,
          authorAvatar: author ? author.avatar : null,
        };
      })
    );

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
