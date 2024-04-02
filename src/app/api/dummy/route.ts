import UserModel from "@/model/user";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const myProfile = {
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      name: "TheON2",
      role: "BJ",
      grade: 2,
      point: 10040,
      tear: "A+",
      BELO: { race: "P", pw: 4, pl: 3, tw: 2, tl: 4, zw: 1, zl: 3 },
      team: "갈락티코",
    };
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const user = new UserModel(myProfile);
    await user.save(); // 데이터베이스에 저장

    console.log("더미 데이터 삽입 성공");
    return Response.json({
      uploaded: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
