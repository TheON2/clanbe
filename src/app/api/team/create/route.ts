import mongoose from "mongoose";
import TeamModel from "@/models/team";
import { uploadImage } from "@/service/posts";

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

      const teamName = formData.get("name"); // 요청에서 유저 ID 받아오기
      const teamLeader = formData.get("leader"); // 요청에서 유저 ID 받아오기
      const teamSubLeader = formData.get("subleader"); // 요청에서 유저 ID 받아오기

      // name: String, // 팀 이름
      //     ranking: Number, // 팀 순위
      //     w: Number, // 승리 횟수
      //     l: Number, // 패배 횟수
      //     point: Number, // 점수
      //     winpoint: Number, // 승점
      //     leader: String, //팀장닉네임
      //     subleader: String, //부팀장닉네임
      //     members: [String], //멤버들 닉네임

      const team = new TeamModel({
        name: teamName,
        w: 0,
        l: 0,
        point: 0,
        winpoint: 0,
        leader: teamLeader,
        subleader: teamSubLeader,
        member:[]
      });

      const savedTeam = await team.save();

      console.log("팀 생성 성공");
      return Response.json({
        uploaded: true,
        url: fileUrl,
      });
    } else {
      throw new Error("팀 생성에 실패하였습니다.");
    }
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
