import BettingModel from "@/models/betting";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const {
      title,
      matchDate,
      home,
      away,
      homeBetRate,
      awayBetRate,
      betMax,
      status,
    } = body.newBettingData;

    console.log(body);

    // 포인트 전송 기록 저장
    const newBetting = new BettingModel({
      title,
      matchDate,
      home,
      away,
      homeBetRate,
      awayBetRate,
      betMax,
      status,
      bets: [],
    });

    await newBetting.save();

    return new Response(JSON.stringify({ message: "베팅등록 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving league event:", error);
    return new Response(JSON.stringify({ message: "베팅등록 실패" }), {
      status: 500,
    });
  }
}
