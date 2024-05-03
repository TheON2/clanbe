import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import mongoose from "mongoose";
import { Team } from "../../../../types/types";
import { User } from "next-auth";

export async function POST(req: Request, res: Response) {
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const existingUsers = await UserModel.find({}).select("-password");

    if (!existingUsers) {
      return new Response(JSON.stringify({ message: "유저정보 조회 불가" }), {
        status: 409,
      });
      }

      const transformedUsers: User[] = existingUsers.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(), // MongoDB ObjectId를 문자열로 변환
    }));
      
    const teams = await TeamModel.find({});

    const transformedTeam: Team[] = teams.map((team) => ({
      ...team.toObject(),
      _id: team._id.toString(), // MongoDB ObjectId를 문자열로 변환
    }));

    return new Response(JSON.stringify({ users: transformedUsers,teams:transformedTeam }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
