import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { htmlContent, title, description, category, thumbnail, featured,author,view } =
    body.postData;

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
      view
    });

    console.log(post);

    try {
      const savedPost = await post.save();
      console.log("게시글 저장 성공");
      return new Response(
        JSON.stringify({
          message: "게시글 업로드 성공",
        }),
        {
          status: 200,
          statusText: savedPost._id.toString(),
        }
      );
    } catch (error) {
      console.error("게시글 저장 실패:", error);
      // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
      console.error(error);
    }

    console.log("업로드 성공");
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
