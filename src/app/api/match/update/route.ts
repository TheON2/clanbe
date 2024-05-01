import mongoose from "mongoose";
import MatchModel from "@/models/match";

export async function POST(req: Request) {
  const body = await req.json();
 let { name, date, winner, wrace, loser, lrace, map,id } = body;

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const findMatch = await MatchModel.findById(id);
    if (!findMatch) {
      return new Response(
        JSON.stringify({ message: "경기를 찾을 수 없음" }),
        {
          status: 401,
        }
      );
    }

    findMatch.name = name;
    findMatch.date = date;
    findMatch.winner = winner;
    findMatch.wrace = wrace;
    findMatch.loser = loser;
    findMatch.lrace = lrace;
    findMatch.map = map;
    if (date !== "") findMatch.date = date;

    await findMatch.save();

    console.log("경기 수정 성공");
    return new Response(
      JSON.stringify({
        message: "경기 수정 성공",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("경기 수정 실패:", error);
    // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
    console.error(error);
  }
}
