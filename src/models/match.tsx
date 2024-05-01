import mongoose, { Model } from "mongoose";
import { Match } from "../../types/types";

const matchSchema = new mongoose.Schema(
  {
    name: String,
    winner: String,
    wrace: String,
    loser: String,
    lrace: String,
    map: String,
    date:Date,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let MatchModel: Model<Match>;

if (mongoose.modelNames().includes("match")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  MatchModel = mongoose.model<Match>("match");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  MatchModel = mongoose.model<Match>("match", matchSchema, "match");
}

export default MatchModel;
