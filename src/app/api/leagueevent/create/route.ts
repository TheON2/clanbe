// src/app/api/leagueevent/create/route.ts
import LeagueEventModel from "@/models/leagueevent";
import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import mongoose from "mongoose";

type League = {
  pw: number;
  pl: number;
  tw: number;
  tl: number;
  zw: number;
  zl: number;
};

type RaceMap = {
  [key: string]: { win: keyof League; lose: keyof League };
};

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const newLeagueEvent = new LeagueEventModel({
      title: body.title,
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

    const resultsCount = { 1: 0, 2: 0 };

    newLeagueEvent.sets.forEach((set) => {
      if (set.result === 1 || set.result === 2) {
        resultsCount[set.result]++;
      }
    });

    if (resultsCount[1] >= 3 || resultsCount[2] >= 3) {
      const raceMap: RaceMap = {
        p: { win: "pw", lose: "pl" },
        t: { win: "tw", lose: "tl" },
        z: { win: "zw", lose: "zl" },
      };

      await Promise.all(
        newLeagueEvent.sets.map(async (set) => {
          const homeUser = await UserModel.findOne({
            nickname: set.homePlayer,
          });
          const awayUser = await UserModel.findOne({
            nickname: set.awayPlayer,
          });

          if (homeUser && awayUser) {
            const homeRace = homeUser.BELO.race;
            const awayRace = awayUser.BELO.race;

            if (set.result === 1) {
              homeUser.league[raceMap[homeRace].win] += 1;
              awayUser.league[raceMap[awayRace].lose] += 1;
            } else if (set.result === 2) {
              homeUser.league[raceMap[homeRace].lose] += 1;
              awayUser.league[raceMap[awayRace].win] += 1;
            }

            await homeUser.save();
            await awayUser.save();
          }
        })
      );

      const homeTeam = await TeamModel.findById(newLeagueEvent.homeId);
      const awayTeam = await TeamModel.findById(newLeagueEvent.awayId);

      if (homeTeam && awayTeam) {
        if (resultsCount[1] >= 3) {
          // resultCount[1]>=3일때 home팀의 w를 1추가 , winpoint를 3추가
          homeTeam.w += 1;
          homeTeam.winpoint += 3;
          // resultCount[1]-resultCount[2]의 값을 point에 추가
          homeTeam.point += resultsCount[1] - resultsCount[2];

          // resultCount[1]>=3일때 away팀의 l을 1추가 , winpoint를 1추가
          awayTeam.l += 1;
          awayTeam.winpoint += 1;
          // resultCount[2]-resultCount[1]의 값을 point에 추가
          awayTeam.point += resultsCount[2] - resultsCount[1];
        } else if (resultsCount[2] >= 3) {
          // resultCount[2]>=3일때 away팀의 w를 1추가 , winpoint를 3추가
          awayTeam.w += 1;
          awayTeam.winpoint += 3;
          // resultCount[2]-resultCount[1]의 값을 point에 추가
          awayTeam.point += resultsCount[2] - resultsCount[1];

          // resultCount[2]>=3일때 home팀의 l을 1추가 , winpoint를 1추가
          homeTeam.l += 1;
          homeTeam.winpoint += 1;
          // resultCount[1]-resultCount[2]의 값을 point에 추가
          homeTeam.point += resultsCount[1] - resultsCount[2];
        }

        await homeTeam.save();
        await awayTeam.save();
      }
    }

    return new Response(
      JSON.stringify({ message: "리그 이벤트가 성공적으로 저장되었습니다." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving league event:", error);
    return new Response(JSON.stringify({ message: "리그 이벤트 저장 실패" }), {
      status: 500,
    });
  }
}
