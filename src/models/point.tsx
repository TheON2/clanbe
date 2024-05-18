import mongoose, { Model } from "mongoose";
import { Point } from "../../types/types";

const pointSchema = new mongoose.Schema(
  {
    senduser: String,
    receiveuser: String,
    point: Number,
    sbeforepoint: Number,
    safterpoint: Number,
    rbeforepoint: Number,
    rafterpoint: Number,
    message: String,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let PointModel: Model<Point>;

if (mongoose.modelNames().includes("point")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  PointModel = mongoose.model<Point>("point");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  PointModel = mongoose.model<Point>("point", pointSchema, "point");
}

export default PointModel;
