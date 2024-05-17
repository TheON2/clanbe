import LeagueEventModel from "@/models/leagueevent";
import mongoose from "mongoose";


export async function POST(req: Request, res: Response) {
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const leagueEvents = await LeagueEventModel.find({})
    
    if (!leagueEvents) {
      return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 401,
    });
    }

    return new Response(JSON.stringify({leagueEvents}), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
