"use server";

interface UserSupportInfo {
  _id: string;
  amount: number;
  nickname: string;
  user?: {
    name: string;
    avatar: string;
    email: string;
  };
  createdAt?: Date;
}

interface SupportMap {
  [key: string]: UserSupportInfo;
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

     // 모든 후원 데이터를 먼저 조회
    const supportsData = await SupportModel.find({});

     // 각 후원 데이터의 email을 사용하여 UserModel에서 사용자 정보 조회
    const userDetails = await Promise.all(
      supportsData.map(async (support) => {
        if (support.email) {
          const userInfo = await UserModel.findOne({ nickname: support.email }).select('-password');
          return { ...support.toObject(), userInfo };  // 후원 데이터와 사용자 정보 결합
        }
        return support;  // 이메일이 없는 경우 그대로 반환
      })
    );

    const supportsMap: { [key: string]: any } = {};
    const allSupports: any[] = [];

    userDetails.forEach(support => {
      if ('userInfo' in support) {
        const user = support.userInfo;
        const supportRecord = {
          amount: support.amount,
          _id: support._id.toString(),
          nickname: support.email,
          createdAt:support.createdAt,
          user: {
            avatar: user?.avatar,
            email: user?.email,
            name: user?.name
          }
        };

        // 모든 후원 내역을 allSupports에 추가
        allSupports.push(supportRecord);

        // 사용자별로 후원 내역을 집계하여 supportsMap에 저장
        if (user && user.email) {
          const userEmail = user.email;
          if (supportsMap[userEmail]) {
            supportsMap[userEmail].amount += support.amount; // 총합 업데이트
          } else {
            supportsMap[userEmail] = { ...supportRecord };
          }
        }
      }
    });

    // allSupports: 최신 후원 내역 순
    allSupports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // supports: 후원 총액 내림차순으로 정렬
    const supports = Object.values(supportsMap).sort((a, b) => b.amount - a.amount);

    //console.log(supports,allSupports)

    return new Response(JSON.stringify({ supports,allSupports }), {
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
