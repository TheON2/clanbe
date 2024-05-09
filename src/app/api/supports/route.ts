"use server";

interface SupportInfo {
  _id: string;
  amount: number;
  nickname: string;
  user?: {
    name: string;
    avatar: string;
    email: string;
  };
  createdAt: Date;
}

interface SupportMap {
  [key: string]: SupportInfo;
}

import { NextApiRequest, NextApiResponse } from "next";
import { uploadPostData } from "@/service/posts";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PostModel from "@/models/post";
import { revalidatePath, revalidateTag } from "next/cache";
import UserModel from "@/models/user";
import SupportModel from "@/models/support";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    const supportsData = await SupportModel.find({});

    return new Response(JSON.stringify({supportsData}), {
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
