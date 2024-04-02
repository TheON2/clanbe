import mongoose from "mongoose";

const teamStatusSchema = new mongoose.Schema({
  ranking: Number, // 팀 순위
  w: Number, // 승리 횟수
  l: Number, // 패배 횟수
  point: Number, // 점수
  winpoint: Number, // 승점
  enemy: {
    name: String, // 상대 팀 이름
    day: Date, // 경기 날짜
  },
});

const teamSchema = new mongoose.Schema(
  {
    name: String, // 팀 이름
    status: teamStatusSchema, // 팀 상태
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

const TeamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default TeamModel;
