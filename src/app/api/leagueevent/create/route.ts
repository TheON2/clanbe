// src/app/api/leagueevent/create/route.ts
import LeagueEventModel from "@/models/leagueevent";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const newLeagueEvent = new LeagueEventModel({
      homeId: body.homeId,
      awayId: body.awayId,
      date: body.date,
      sets: body.sets.map((set: any) => ({
        homePlayer: set.homePlayer,
        awayPlayer: set.awayPlayer,
        map: set.map,
        tier: set.tier,
        result: set.result,
      })),
    });

    await newLeagueEvent.save();

    return new Response(JSON.stringify({ message: "리그 이벤트가 성공적으로 저장되었습니다." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving league event:", error);
    return new Response(JSON.stringify({ message: "리그 이벤트 저장 실패" }), {
      status: 500,
    });
  }
}
