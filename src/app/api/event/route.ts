import mongoose from "mongoose";
import EventModel from "@/models/event";
import LeagueEventModel from "@/models/leagueevent";
import TeamModel from "@/models/team";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    const events = await EventModel.find({});
    const leagueEvents = await LeagueEventModel.find({});
    const teams = await TeamModel.find({});
    
    if (!leagueEvents) {
      return new Response(JSON.stringify({ message: "조회 실패" }), {
        status: 401,
      });
    }

    const formattedEvents = events.map((event) => ({
      id: event._id.toString(), // MongoDB _id field to id
      title: event.title,
      date: event.date,
      description: event.description,
      author: event.author,
      type: "general",
    }));

    const getTeamNameById = (id: string) => {
      const team = teams.find((team) => team._id.toString() === id);
      return team ? team.name : "Unknown";
    };

    const formattedLeagueEvents = leagueEvents.map((event) => ({
      id: event._id.toString(),
      title: `BPL ${getTeamNameById(event.homeId)} vs ${getTeamNameById(event.awayId)}`,
      description: `Be클랜 프로리그 ${getTeamNameById(event.homeId)} vs ${getTeamNameById(event.awayId)}`,
      date: event.date,
      author: "sniperad@naver.com",
      type: "league",
      homeTeamName: getTeamNameById(event.homeId),
      awayTeamName: getTeamNameById(event.awayId),
      sets: event.sets.map((set) => ({
        homePlayer: set.homePlayer,
        awayPlayer: set.awayPlayer,
        map: set.map,
        tier: set.tier,
        result: set.result,
      })),
    }));

    const combinedEvents = [...formattedEvents, ...formattedLeagueEvents];

    return new Response(
      JSON.stringify({ events: combinedEvents }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json' // JSON 반환 타입 명시
        }
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
