import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import mongoose from "mongoose";
import {
  headerCLANBE,
  headerBELO,
  headerCOMMUNITY,
  headerLEAGUE,
  headerPOINT,
  beUsers,
  playersData,
  pointMember,
} from "../../../../../public/data";
import CategoryModel from "@/models/category";

export async function POST(req: Request, res: Response) {
  try {
    const teams = ["660cc0e452afd8daf291b3b9", "660cc0e452afd8daf291b3ba", "6641b6bd288b8fdc5f10c4ad"];
    let teamIndex = 0;

    const getTier = (belo: number) => {
      if (belo >= 1500) return "S+";
      if (belo >= 1300) return "S";
      if (belo >= 1100) return "A+";
      if (belo >= 1000) return "A";
      if (belo >= 900) return "B+";
      if (belo >= 800) return "B";
      if (belo >= 700) return "C";
      return "D";
    };

    const tierMapping: {[key: string]: any} = {
      "S+": [],
      "S": [],
      "A+": [],
      "A": [],
      "B+": [],
      "B": [],
      "C": [],
      "D": []
    };

    // 사용자 데이터를 변환하고 티어 분류
    const transformedUsers = beUsers.map((user, index) => {
      const playerData = playersData.find(
        (p) => p.nickname.toLowerCase() === user.nickname.toLowerCase()
      );
      const playerPoint = pointMember.find(
        (p) => p.nickname.toLowerCase() === user.nickname.toLowerCase()
      );

      let pw, pl, tw, tl, zw, zl;
      if (playerData) {
        const totalWins = playerData.wins;
        const totalLosses = playerData.losses;
        pw = Math.round(totalWins * 0.4);
        pl = Math.round(totalLosses * 0.4);
        tw = Math.round(totalWins * 0.35);
        tl = Math.round(totalLosses * 0.35);
        zw = Math.round(totalWins * 0.25);
        zl = Math.round(totalLosses * 0.25);
      } else {
        pw = pl = tw = tl = zw = zl = 0;
      }

      const belo = playerData && !isNaN(Number(playerData.belo)) ? Number(playerData.belo) : 0;
      const tier = getTier(Number(belo));
      tierMapping[tier].push(user);

      return {
        email: user.email.replace("title: ", ""),
        password: "$2b$10$cn.9ZkBlc8bqOqK0NFLXkeVXDWZBZXwLJePtmx0g/EMCFNKB8wqRW",
        kakao: `theon${index + 2}`,
        birth: new Date("1993-12-25T00:00:00.000Z"),
        nickname: user.nickname,
        name: user.name,
        phone: `010-${index.toString().padStart(4, '0')}-${(1000 + index).toString().slice(1)}`,
        point: playerPoint ? playerPoint.points : 0,
        role: user.group.includes("관리그룹") ? "Staff" : "Member",
        grade: user.group.includes("관리그룹") ? 5 : 1,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        createdAt: new Date(user.registrationDate),
        tear: tier,
        BELO: {
          race: playerData ? playerData.race : "unknown",
          pw,
          pl,
          tw,
          tl,
          zw,
          zl,
          belo,
        },
        league: {
          race: playerData ? playerData.race : "unknown",
          pw: 0,
          pl: 0,
          tw: 0,
          tl: 0,
          zw: 0,
          zl: 0,
        },
        team: teams[index % teams.length],
        message: "만나서 반갑습니다."
      };
    });

    // 순환적으로 팀 할당
    Object.values(tierMapping).forEach(usersInTier => {
      usersInTier.forEach((user:any) => {
        user.team = teams[teamIndex];
        teamIndex = (teamIndex + 1) % teams.length;
      });
    });

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    UserModel.insertMany(transformedUsers)
      .then(function (docs) {
        console.log("Data inserted"); // 성공 시 로그
        mongoose.connection.close(); // 데이터 삽입 후 연결 종료
      })
      .catch(function (err) {
        console.log(err); // 에러 핸들링
      });

    return new Response(JSON.stringify({ message: "더미 전송 완료" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "더미 전송에 실패함!" }), {
      status: 500,
    });
  }
}
