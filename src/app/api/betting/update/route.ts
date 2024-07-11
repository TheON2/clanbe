import BettingModel from "@/models/betting";
import UserModel from "@/models/user";
import { ex } from "@fullcalendar/core/internal-common";
import mongoose from "mongoose";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const {
      betId,
      title,
      matchDate,
      home,
      away,
      homeBetRate,
      awayBetRate,
      betMax,
      status,
    } = body.updateBettingData;

    console.log(body);

    const existingBetting = await BettingModel.findOne({ _id: betId });

    if (!existingBetting) {
      return new Response(
        JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    if (existingBetting.status === "종료") {
      return new Response(
        JSON.stringify({ message: "종료된 베팅은 수정할 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    existingBetting.title = title;
    existingBetting.home = home;
    existingBetting.away = away;
    existingBetting.homeBetRate = homeBetRate;
    existingBetting.awayBetRate = awayBetRate;
    existingBetting.betMax = betMax;
    existingBetting.status = status;
    existingBetting.matchDate = matchDate;

    await existingBetting.save();

    return new Response(JSON.stringify({ message: "베팅 수정 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
