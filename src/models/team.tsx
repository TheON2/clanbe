import mongoose, { Model } from "mongoose";
import { Team } from "../../types/types";

const teamSchema = new mongoose.Schema(
  {
    name: String, // 팀 이름
    ranking: Number, // 팀 순위
    w: Number, // 승리 횟수
    l: Number, // 패배 횟수
    point: Number, // 점수
    winpoint: Number, // 승점
    leader: String, //팀장닉네임
    subleader: String, //부팀장닉네임
    members: [String], //멤버들 닉네임
    avatar: String,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let TeamModel: Model<Team>;

if (mongoose.modelNames().includes("team")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  TeamModel = mongoose.model<Team>("team");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  TeamModel = mongoose.model<Team>("team", teamSchema, "team");
}

export default TeamModel;
