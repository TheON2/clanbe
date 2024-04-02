import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: String, // 팀 이름
    ranking: Number, // 팀 순위
    w: Number, // 승리 횟수
    l: Number, // 패배 횟수
    point: Number, // 점수
    winpoint: Number, // 승점
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

const TeamModel =
  mongoose.models.team || mongoose.model("team", teamSchema, "team");

export default TeamModel;
