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

    const { bettingId } = body;

    const existingBetting = await BettingModel.findOneAndDelete({
      _id: bettingId,
    });

    //배팅이 완료가 아닐경우 모든 배팅금액 유저들에게 반환
    if (existingBetting?.status !== "종료") {
      for (let i = 0; i < existingBetting?.bets.length; i++) {
        const { nickname, amount } = existingBetting.bets[i];

        const user = await UserModel.findOne({ nickname });

        if (user) {
          user.point += amount;
          await user.save();
        }
      }
    }

    if (!existingBetting) {
      return new Response(
        JSON.stringify({ message: "베팅을 찾을 수 없습니다." }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ message: "베팅 삭제 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
