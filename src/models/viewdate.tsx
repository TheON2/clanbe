import mongoose, { Model } from "mongoose";
import { ViewDate } from "../../types/types";

const viewDateSchema = new mongoose.Schema(
  {
    _id: String,
    userid: String,
    postid: String,
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let viewDateModel: Model<ViewDate>;

if (mongoose.modelNames().includes("viewdate")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  viewDateModel = mongoose.model<ViewDate>("viewdate");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  viewDateModel = mongoose.model<ViewDate>(
    "viewdate",
    viewDateSchema,
    "viewdate"
  );
}

export default viewDateModel;
