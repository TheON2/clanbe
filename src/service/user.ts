import mongoose from "mongoose";
import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import { Team, User } from "../../types/types";
import { Document } from "mongoose";

export const getNavData = async () => {
  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    // 데이터베이스에서 모든 게시글을 검색
    const users = await UserModel.find({});
    const teams = await TeamModel.find({});
    console.log(users);
    console.log(teams);

    const transformedUser: User[] = users.map((user: Document) => ({
      ...user.toObject(),
      _id: user._id.toString(), // MongoDB ObjectId를 문자열로 변환
    }));

    const transformedTeam: Team[] = teams.map((team: Document) => ({
      ...team.toObject(),
      _id: team._id.toString(), // MongoDB ObjectId를 문자열로 변환
    }));

    // 데이터 변환 로직은 필요에 따라 조정
    return {
      user: transformedUser,
      teams: transformedTeam,
    };
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
};
