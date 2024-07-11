import BettingModel from "@/models/betting";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const { nickname, amount, choice, bettingId } = body;

    const existingBetting = await BettingModel.findOne({ _id: bettingId });

    if (!existingBetting) {
      return new Response(
        JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    if (existingBetting.status !== "경기전") {
      return new Response(
        JSON.stringify({ message: "베팅가능시간이 지났습니다." }),
        {
          status: 404,
        }
      );
    }

    const exsistingBetUser = existingBetting.bets.find(
      (bet: any) => bet.nickname === nickname
    );

    if (exsistingBetUser) {
      return new Response(
        JSON.stringify({ message: "이미 배팅한 경기 입니다." }),
        {
          status: 404,
        }
      );
    } else {
      const betUser = await UserModel.findOne({ nickname });
      if (betUser) {
        betUser.point -= amount;
        await betUser.save();
        existingBetting.bets.push({
          nickname,
          amount,
          choice,
        });
        await existingBetting.save();
      } else {
        return new Response(
          JSON.stringify({ message: "유저를 찾을 수 없습니다." }),
          {
            status: 404,
          }
        );
      }
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
