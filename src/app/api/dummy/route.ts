import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const myProfile = {
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      name: "TheON2",
      role: "BJ",
      grade: 2,
      point: 10040,
      tear: "A+",
      BELO: { race: "P", pw: 4, pl: 3, tw: 2, tl: 4, zw: 1, zl: 3 },
      team: "갈락티코",
    };

    const proleagueTeams = [
      {
        name: "갈락티코",
        ranking: 1,
        w: 4,
        l: 2,
        point: 15,
        winpoint: 22,
      },
      {
        name: "버킹엄",
        ranking: 2,
        w: 2,
        l: 4,
        point: 11,
        winpoint: 4,
      },
      {
        name: "원",
        ranking: 3,
        w: 1,
        l: 4,
        point: -3,
        winpoint: 0,
      },
    ];
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const user = new UserModel(myProfile);
    await user.save(); // 데이터베이스에 저장

    TeamModel.insertMany(proleagueTeams)
      .then(function (docs) {
        console.log("Data inserted"); // 성공 시 로그
        mongoose.connection.close(); // 데이터 삽입 후 연결 종료
      })
      .catch(function (err) {
        console.log(err); // 에러 핸들링
      });

    return Response.json({
      uploaded: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
