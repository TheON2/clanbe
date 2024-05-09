import mongoose, { Model } from "mongoose";
import { Match, SupportAmount } from "../../types/types";

const supportSchema = new mongoose.Schema(
  {
    type: Number,
    amount: Number,
    email: String,
    postid: String,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let SupportModel: Model<SupportAmount>;

if (mongoose.modelNames().includes("support")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  SupportModel = mongoose.model<SupportAmount>("support");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  SupportModel = mongoose.model<SupportAmount>(
    "support",
    supportSchema,
    "support"
  );
}

export default SupportModel;
