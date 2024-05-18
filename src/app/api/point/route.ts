import PointModel from "@/models/point";
import mongoose from "mongoose";


export async function POST(req: Request, res: Response) {
  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const points = await PointModel.find({})
    
    if (!points) {
      return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 401,
    });
    }

    return new Response(JSON.stringify({points}), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
