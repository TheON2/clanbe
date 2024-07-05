import mongoose, { Model } from "mongoose";
import { DailyPoint } from "../../types/types";

const dailyPointSchema = new mongoose.Schema(
  {
    _id: String,
    userid: String,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let dailyPointModel: Model<DailyPoint>;

if (mongoose.modelNames().includes("dailypoint")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  dailyPointModel = mongoose.model<DailyPoint>("dailypoint");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  dailyPointModel = mongoose.model<DailyPoint>(
    "dailypoint",
    dailyPointSchema,
    "dailypoint"
  );
}

export default dailyPointModel;
