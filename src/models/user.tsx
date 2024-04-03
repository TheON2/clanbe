import mongoose, { Model } from "mongoose";
import { User } from "../../types/types";

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

let UserModel: Model<User>;

if (mongoose.modelNames().includes("user")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  UserModel = mongoose.model<User>("user");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  UserModel = mongoose.model<User>("user", userSchema, "user");
}

export default UserModel;
