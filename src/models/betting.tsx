import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  choice: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bettingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    home: {
      type: String,
      required: true,
    },
    homeBetRate: {
      type: Number,
      required: true,
    },
    away: {
      type: String,
      required: true,
    },
    awayBetRate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    bets: [betSchema],
  },
  {
    timestamps: true,
  }
);

const BettingModel =
  mongoose.models.betting ||
  mongoose.model("betting", bettingSchema, "betting");

export default BettingModel;
