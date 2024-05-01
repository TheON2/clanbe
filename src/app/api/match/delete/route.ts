import mongoose from "mongoose";
import MatchModel from "@/models/match";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const deletedMatch = await MatchModel.findByIdAndDelete(body);
    if (!deletedMatch) {
      return new Response(
        JSON.stringify({ message: "경기를 찾을 수 없음" }),
        {
          status: 401,
        }
      );
    }

    console.log("경기 삭제 성공");
    return new Response(
      JSON.stringify({
        message: "경기 삭제 성공",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("경기 삭제 실패:", error);
    // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
    console.error(error);
  }
}
