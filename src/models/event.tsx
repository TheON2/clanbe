import mongoose, { Model } from "mongoose";
import { EventType } from "../../types/types";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // 이벤트 제목
    date: { type: String, required: true }, // 이벤트 날짜 (ISO 8601 형식)
    description: { type: String, default: "" }, // 이벤트 설명 (선택 사항)
    author: { type: String, required: true }, // 사용자 ID (이벤트를 생성한 사용자)
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let EventModel: Model<EventType>;

if (mongoose.modelNames().includes("event")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  EventModel = mongoose.model<EventType>("event");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  EventModel = mongoose.model<EventType>("event", eventSchema, "event");
}

export default EventModel;
