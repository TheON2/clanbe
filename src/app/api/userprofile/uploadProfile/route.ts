import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/service/posts";
import mongoose from "mongoose";
import UserModel from "@/models/user";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();

  try {
    const file = formData.get("upload") as File | null;
    if (!file) {
      throw new Error("이미지를 찾을 수 없음");
    }
    const fileUrl = await uploadImage(file);
    // 이미지 업로드 성공 후 유저 정보 업데이트
    if (fileUrl) {
      // 데이터베이스 연결 확인
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
      }

      const userEmail = formData.get("email"); // 요청에서 유저 ID 받아오기
      const existingUser = await UserModel.findOne({email:userEmail});

      if (!existingUser) {
        throw new Error("유저를 찾을 수 없음");
      }

      existingUser.avatar = fileUrl; // 새로운 URL로 업데이트
      await existingUser.save(); // 변경사항 저장

      console.log("업로드 성공");
      return Response.json({
        uploaded: true,
        url: fileUrl,
      });
    } else {
      throw new Error("이미지 업로드에 실패하였습니다.");
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
