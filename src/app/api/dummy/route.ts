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
} from "../../../../public/data";
import CategoryModel from "@/models/category";

export async function POST(req: Request, res: Response) {
  try {

    const getTier = (belo: number) => {
    if (belo >= 1500) return "S+";
    if (belo >= 1300) return "S";
    if (belo >= 1100) return "A+";
    if (belo >= 1000) return "A";
    if (belo >= 900) return "B+";
    if (belo >= 800) return "B";
    if (belo >= 700) return "C";
    return "D"; // For all BELO less than 700
  };
    const transformedUsers = beUsers.map((user) => {
      const playerData = playersData.find(
        (p) => p.nickname.toLowerCase() === user.nickname.toLowerCase()
      );
      const playerPoint = pointMember.find(
        (p) => p.nickname.toLowerCase() === user.nickname.toLowerCase()
      );
      let pw, pl, tw, tl, zw, zl;

      if (playerData) {
        // 총 승패수를 토스, 테란, 저그 비율에 맞추어 분배
        const totalWins = playerData.wins;
        const totalLosses = playerData.losses;
        pw = Math.round(totalWins * 0.4); // 토스전 승리
        pl = Math.round(totalLosses * 0.4); // 토스전 패배
        tw = Math.round(totalWins * 0.35); // 테란전 승리
        tl = Math.round(totalLosses * 0.35); // 테란전 패배
        zw = Math.round(totalWins * 0.25); // 저그전 승리
        zl = Math.round(totalLosses * 0.25); // 저그전 패배
      } else {
        // 데이터가 없는 경우 모든 값은 0으로 설정
        pw = pl = tw = tl = zw = zl = 0;
      }

let belo = playerData && !isNaN(Number(playerData.belo)) ? Number(playerData.belo) : 0; // NaN 검사 추가

      return {
        email: user.email.replace("title: ", ""), // "title:" 제거
        password:
          "$2b$10$cn.9ZkBlc8bqOqK0NFLXkeVXDWZBZXwLJePtmx0g/EMCFNKB8wqRW",
        kakao: "theon2",
        birth: new Date("1993-12-25T00:00:00.000Z"),
        nickname: user.nickname,
        name: user.name,
        point: playerPoint ? playerPoint.points : 0,
        role: user.group,
        grade: user.group.includes("관리그룹") ? 4 : 1,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        createdAt: new Date(user.registrationDate),
        tear: getTier( playerData ? Number(playerData.belo) : 0 ),
        BELO: {
          race: playerData ? playerData.race : "unknown",
          pw: pw,
          pl: pl,
          tw: tw,
          tl: tl,
          zw: zw,
          zl: zl,
          belo: belo,
        },
        team: "", // 이 항목은 필요한 정보가 제공되지 않아 비워둡니다.
      };
    });

    //console.log(transformedUsers);
    // const myProfile = {
    //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //   name: "TheON2",
    //   role: "BJ",
    //   grade: 2,
    //   point: 10040,
    //   tear: "A+",
    //   BELO: { race: "P", pw: 4, pl: 3, tw: 2, tl: 4, zw: 1, zl: 3 },
    //   team: "갈락티코",
    // };

    // const proleagueTeams = [
    //   {
    //     name: "갈락티코",
    //     ranking: 1,
    //     w: 4,
    //     l: 2,
    //     point: 15,
    //     winpoint: 22,
    //   },
    //   {
    //     name: "버킹엄",
    //     ranking: 2,
    //     w: 2,
    //     l: 4,
    //     point: 11,
    //     winpoint: 4,
    //   },
    //   {
    //     name: "원",
    //     ranking: 3,
    //     w: 1,
    //     l: 4,
    //     point: -3,
    //     winpoint: 0,
    //   },
    // ];

    // const category = [
    //   headerCLANBE,
    //   headerBELO,
    //   headerCOMMUNITY,
    //   headerLEAGUE,
    //   headerPOINT
    // ]
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    // const user = new UserModel(myProfile);
    // await user.save(); // 데이터베이스에 저장

     UserModel.insertMany(transformedUsers)
      .then(function (docs) {
        console.log("Data inserted"); // 성공 시 로그
        mongoose.connection.close(); // 데이터 삽입 후 연결 종료
      })
      .catch(function (err) {
        console.log(err); // 에러 핸들링
      });

    // CategoryModel.insertMany(category)
    //   .then(function (docs) {
    //     console.log("Data inserted"); // 성공 시 로그
    //     mongoose.connection.close(); // 데이터 삽입 후 연결 종료
    //   })
    //   .catch(function (err) {
    //     console.log(err); // 에러 핸들링
    //   });

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
