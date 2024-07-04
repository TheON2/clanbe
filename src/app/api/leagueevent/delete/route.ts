import mongoose from "mongoose";
import LeagueEventModel from "@/models/leagueevent";
import TeamModel from "@/models/team";
import UserModel from "@/models/user";

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
  const session = await mongoose.startSession();

  try {
    const deleteId = await req.json();

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    session.startTransaction();

    const deletedEvent = await LeagueEventModel.findByIdAndDelete(
      deleteId
    ).session(session);

    if (!deletedEvent) {
      await session.abortTransaction();
      session.endSession();
      return new Response(
        JSON.stringify({ message: "삭제할 이벤트를 찾을 수 없습니다." }),
        { status: 404 }
      );
    }

    const resultsCount = { 1: 0, 2: 0 };

    deletedEvent.sets.forEach((set) => {
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

      for (const set of deletedEvent.sets) {
        const homeUser = await UserModel.findOne({
          nickname: set.homePlayer,
        }).session(session);
        const awayUser = await UserModel.findOne({
          nickname: set.awayPlayer,
        }).session(session);

        if (homeUser && awayUser) {
          const homeRace = homeUser.BELO.race;
          const awayRace = awayUser.BELO.race;

          if (set.result === 1) {
            homeUser.league[raceMap[homeRace].win] -= 1;
            awayUser.league[raceMap[awayRace].lose] -= 1;
          } else if (set.result === 2) {
            homeUser.league[raceMap[homeRace].lose] -= 1;
            awayUser.league[raceMap[awayRace].win] -= 1;
          }

          await homeUser.save({ session });
          await awayUser.save({ session });
        }
      }

      const homeTeam = await TeamModel.findById(deletedEvent.homeId).session(
        session
      );
      const awayTeam = await TeamModel.findById(deletedEvent.awayId).session(
        session
      );

      if (homeTeam && awayTeam) {
        if (resultsCount[1] >= 3) {
          homeTeam.w -= 1;
          homeTeam.winpoint -= 3;
          homeTeam.point -= resultsCount[1] - resultsCount[2];

          awayTeam.l -= 1;
          awayTeam.winpoint -= 1;
          awayTeam.point -= resultsCount[2] - resultsCount[1];
        } else if (resultsCount[2] >= 3) {
          awayTeam.w -= 1;
          awayTeam.winpoint -= 3;
          awayTeam.point -= resultsCount[2] - resultsCount[1];

          homeTeam.l -= 1;
          homeTeam.winpoint -= 1;
          homeTeam.point -= resultsCount[1] - resultsCount[2];
        }

        await homeTeam.save({ session });
        await awayTeam.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    return new Response(
      JSON.stringify({ message: "이벤트가 성공적으로 삭제되었습니다." }),
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("이벤트 삭제 중 오류 발생:", error);
    return new Response(JSON.stringify({ message: "삭제 실패" }), {
      status: 500,
    });
  }
}
