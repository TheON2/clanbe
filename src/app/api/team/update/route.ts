import mongoose from "mongoose";
import TeamModel from "@/models/team";
import { uploadImage } from "@/service/posts";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const teamName = formData.get("name"); // 요청에서 유저 ID 받아오기
    const teamNewName = formData.get("newname"); // 요청에서 유저 ID 받아오기
    const teamLeader = formData.get("leader"); // 요청에서 유저 ID 받아오기
    const teamAvatar = formData.get("avatar"); // 요청에서 유저 ID 받아오기
    const teamSubLeader = formData.get("subleader"); // 요청에서 유저 ID 받아오기

    const existingTeam = await TeamModel.findOne({ name: teamName });

    if (!existingTeam) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 팀입니다." }),
        {
          status: 409,
        }
      );
    }

    existingTeam.name = teamNewName as string;
    existingTeam.leader = teamLeader as string;
    existingTeam.subleader = teamSubLeader as string;

    const file = formData.get("upload") as File | null;
    if (file) {
      const fileUrl = await uploadImage(file);
      existingTeam.avatar = fileUrl as string;
    } else {
      existingTeam.avatar = teamAvatar as string;
    }

    existingTeam.save();

    return new Response(JSON.stringify({ message: "업데이트 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
