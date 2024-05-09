import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request, res: Response) {
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    // nickname 필드만 선택하여 모든 유저의 정보를 조회합니다.
    const existingUsers = await UserModel.find({}).select("-password");

    if (!existingUsers) {
      return new Response(JSON.stringify({ message: "유저정보 조회 불가" }), {
        status: 409,
      });
    }

    // nickname만 배열로 추출합니다.
    const nicknames = existingUsers.map(user => user.nickname);

    return new Response(JSON.stringify({ nicknames }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
