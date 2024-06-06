import BettingModel from "@/models/betting";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const { title, home, away } = body;

    // 홈과 어웨이에 등록된 유저를 조회
    const homeUser = await UserModel.findOne({ nickname: home });
    const awayUser = await UserModel.findOne({ nickname: away });

    if (!homeUser || !awayUser) {
      return new Response(
        JSON.stringify({ message: "베팅 출전 선수를 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    // 포인트 전송 기록 저장
    const newBetting = new BettingModel({
      title,
      home,
      away,
      status: "베팅중",
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
