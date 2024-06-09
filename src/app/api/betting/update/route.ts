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

    const { nickname, amount, choice, bettingId, status } = body;

    const existingBetting = await BettingModel.findOne({ _id: bettingId });

    if (!existingBetting) {
      return new Response(
        JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    if (status) {
      existingBetting.status = status;
      await existingBetting.save();
      return new Response(JSON.stringify({ message: "베팅 상태변경 성공" }), {
        status: 200,
      });
    }

    if (choice === "cancel") {
      //bets내에 nickname이 존재하는지 체크 후 존재할시 삭제 및 amount 복구
      const betting = existingBetting.bets.find(
        (bet: any) => bet.nickname === nickname
      );
      if (!betting) {
        return new Response(
          JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
          {
            status: 404,
          }
        );
      }
      const user = await UserModel.findOne({ nickname });
      if (user) {
        user.point += betting.amount;
        await user.save();
      } else {
        return new Response(
          JSON.stringify({ message: "유저를 찾을 수 없습니다." }),
          {
            status: 404,
          }
        );
      }
      existingBetting.bets = existingBetting.bets.filter(
        (bet: any) => bet.nickname !== nickname
      );
      await existingBetting.save();
      return new Response(JSON.stringify({ message: "베팅 취소 성공" }), {
        status: 200,
      });
    }

    // 베팅 기록 저장
    existingBetting.bets.push({
      nickname,
      amount,
      choice,
    });

    await existingBetting.save();

    return new Response(JSON.stringify({ message: "베팅 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
