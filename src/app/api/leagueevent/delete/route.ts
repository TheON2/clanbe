import mongoose from "mongoose";
import LeagueEventModel from "@/models/leagueevent";

export async function POST(req: Request) {
  try {
    // 요청 본문에서 삭제할 이벤트 ID를 가져옵니다.
    const { deleteId } = await req.json();

    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    // 해당 이벤트를 데이터베이스에서 삭제합니다.
    const deletedEvent = await LeagueEventModel.findByIdAndDelete(deleteId);

    if (!deletedEvent) {
      return new Response(JSON.stringify({ message: "삭제할 이벤트를 찾을 수 없습니다." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "이벤트가 성공적으로 삭제되었습니다." }), {
      status: 200,
    });
  } catch (error) {
    console.error("이벤트 삭제 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "삭제 실패" }), {
      status: 500,
    });
  }
}
