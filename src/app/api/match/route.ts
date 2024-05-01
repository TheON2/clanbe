import mongoose from "mongoose";
import { EventType } from "../../../../types/types";
import MatchModel from "@/models/match";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    const matchs = await MatchModel.find({});

    const formattedMatchs = matchs.map((match) => ({
      id: match._id.toString(), // MongoDB _id field to id
      name: match.name,
      date: match.date,
      winner: match.winner,
      wrace: match.wrace,
      loser: match.loser,
      lrace: match.lrace,
      map: match.map,
    }));

    return new Response(
      JSON.stringify({ matchs:formattedMatchs }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json' // JSON 반환 타입 명시
        }
      }
    );
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
