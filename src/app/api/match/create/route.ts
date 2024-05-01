import mongoose from "mongoose";
import MatchModel from "@/models/match";

export async function POST(req: Request) {
  const body = await req.json();

  let { name, date, winner, wrace, loser, lrace, map } = body;
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const match = new MatchModel({
      name,
      date,
      winner,
      wrace,
      loser,
      lrace,
      map,
    });

    try {
      await match.save();
      console.log("경기 저장 성공");
      return new Response(
        JSON.stringify({
          message: "경기 저장성공",
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("경기 저장 실패:", error);
      // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
      console.error(error);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
