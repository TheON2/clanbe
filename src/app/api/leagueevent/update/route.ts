import LeagueEventModel from "@/models/leagueevent";
import mongoose from "mongoose";


export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const { id, homeId, awayId, date, sets } = body;

    // 기존 이벤트를 찾아 업데이트
    const updatedLeagueEvent = await LeagueEventModel.findByIdAndUpdate(
      id,
      {
        homeId,
        awayId,
        date,
        sets,
      },
      { new: true }
    );

    if (!updatedLeagueEvent) {
      return new Response(JSON.stringify({ message: "업데이트 실패" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedLeagueEvent), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
