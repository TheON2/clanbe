import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import BettingModel from "@/models/betting";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  console.log(body);
  let { bettingId, winner } = body;

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const existingBetting = await BettingModel.findOne({ _id: bettingId });

    if (!existingBetting) {
      return new Response(
        JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    let betRate = 0;

    //winner가 home인지 away인지 확인후 배당율 적용
    if (winner === existingBetting.home) {
      betRate = existingBetting.homeRate;
    } else if (winner === existingBetting.away) {
      betRate = existingBetting.awayRate;
    }

    // 베팅 성공 유저들에 대한 포인트 지급
    for (let i = 0; i < existingBetting.bets.length; i++) {
      const { nickname, amount, choice } = existingBetting.bets[i];

      if (winner === choice) {
        const user = await UserModel.findOne({ nickname });

        if (user) {
          user.point += amount * betRate;
          await user.save();
        }
      }
    }

    // 베팅 결과 반영
    existingBetting.status = "종료";
    await existingBetting.save();

    return new Response(JSON.stringify({ message: "베팅 결과반영 완료" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "베팅 결과반영 실패" }), {
      status: 500,
    });
  }
}
