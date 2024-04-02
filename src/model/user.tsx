import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: String, // 사용자의 아바타 URL
    name: String, // 사용자 이름
    role: String, // 사용자 역할
    grade: Number, // 사용자 등급
    point: Number, // 사용자 포인트
    tear: String, // 사용자 티어
    BELO: {
      race: String, // 사용자 경주 종류
      pw: Number, // 개인전 승리
      pl: Number, // 개인전 패배
      tw: Number, // 팀전 승리
      tl: Number, // 팀전 패배
      zw: Number, // 종족전 승리
      zl: Number, // 종족전 패배
    },
    team: String, // 소속 팀 이름
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

const UserModel =
  mongoose.models.user || mongoose.model("user", userSchema, "user");

export default UserModel;
