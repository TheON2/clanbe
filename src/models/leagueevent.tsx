import mongoose, { Model, Schema } from "mongoose";
import { EventSet, LeagueEvent } from "../../types/types";

// EventSet 스키마 정의
const eventSetSchema = new mongoose.Schema<EventSet>(
  {
    homePlayer: { type: String, required: true },
    awayPlayer: { type: String, required: true },
    map: { type: String, required: true },
    tier: { type: String, required: true },
    result: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

// LeagueEvent 스키마 정의
const leagueEventSchema = new mongoose.Schema<LeagueEvent>(
  {
    title: { type: String, required: true },
    homeId: { type: String, required: true },
    awayId: { type: String, required: true },
    date: { type: String, required: true },
    sets: { type: [eventSetSchema], required: true },
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let LeagueEventModel: Model<LeagueEvent>;

if (mongoose.modelNames().includes("leagueevent")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  LeagueEventModel = mongoose.model<LeagueEvent>("leagueevent");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  LeagueEventModel = mongoose.model<LeagueEvent>(
    "leagueevent",
    leagueEventSchema,
    "leagueevent"
  );
}

export default LeagueEventModel;
