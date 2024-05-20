import mongoose, { Model } from "mongoose";
import { User } from "../../types/types";

const userSchema = new mongoose.Schema(
  {
    avatar: String, // 사용자의 아바타 URL
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // 비밀번호 필드 추가
    kakao: String,
    birth: Date,
    nickname: String, //사용자 닉네임
    name: String, // 사용자 실명
    role: String, // 사용자 역할
    grade: Number, // 사용자 등급
    point: Number, // 사용자 포인트
    tear: String, // 사용자 티어
    phone: String, //사용자 전화번호
    BELO: {
      race: String,
      pw: Number,
      pl: Number,
      tw: Number,
      tl: Number,
      zw: Number,
      zl: Number,
      belo: Number,
    },
    league: {
      race: String,
      pw: Number,
      pl: Number,
      tw: Number,
      tl: Number,
      zw: Number,
      zl: Number,
      belo: Number,
    },
    team: String, // 소속 팀 이름
    message: String, // 상태 메세지
    idData:String,
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
