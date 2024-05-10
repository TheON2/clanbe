import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/service/posts";

export async function POST(req: Request, res: Response) {

  const formData = await req.formData();

  try {
    const file = formData.get("upload") as File | null;
    if (!file) {
      throw new Error("게시글을 찾을 수 없음");
    }
    const fileUrl = await uploadImage(file);

    console.log("업로드 성공");
    return Response.json({
      uploaded: true,
      url: fileUrl,
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
