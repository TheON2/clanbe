import TeamModel from "@/model/team";
import UserModel from "@/model/user";
import mongoose from "mongoose";

export const getNavData = async () => {
  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    // 데이터베이스에서 모든 게시글을 검색
    const user = await UserModel.find({}); // 모든 게시글을 검색
    const teams = await TeamModel.find({});
    console.log(user);
    console.log(teams);

    // 데이터 변환 로직은 필요에 따라 조정
    const transformedUsers = user.map(user => ({
      ...user.toObject(),
      _id: user._id.toString(),
    }));

    const transformedTeams = teams.map(team => ({
      ...team.toObject(),
      _id: team._id.toString(),
    }));

    return {
      users: transformedUsers,
      teams: transformedTeams,
    };
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
};
