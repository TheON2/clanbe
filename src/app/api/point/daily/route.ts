import dailyPointModel from "@/models/dailypoint";
import UserModel from "@/models/user";
import mongoose from "mongoose";

// yyyyMMdd 형식의 날짜 문자열 생성 함수
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  // 숫자를 두 자리 문자열로 변환 (예: 1 -> 01)
  const monthFormatted = month < 10 ? `0${month}` : `${month}`;
  const dayFormatted = day < 10 ? `0${day}` : `${day}`;

  return `${year}${monthFormatted}${dayFormatted}`;
}

// 가중치를 기반으로 랜덤 포인트 생성 함수
function getRandomWeightedPoint() {
  const minPoint = 30;
  const maxPoint = 500;
  const range = maxPoint - minPoint;

  // 가중치 배열 생성 (1/x 형태의 가중치를 사용)
  const weights = Array.from({ length: range + 1 }, (_, i) => 1 / (i + 1));
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  // 가중치 기반 랜덤 선택
  let random = Math.random() * totalWeight;
  for (let i = 0; i <= range; i++) {
    if (random < weights[i]) {
      return minPoint + i;
    }
    random -= weights[i];
  }

  return minPoint; // 기본적으로 가장 낮은 포인트를 반환
}

export async function POST(req: Request) {
  const body = await req.json();
  let point = getRandomWeightedPoint();
  console.log(body, point);
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const userid = body;

    // 일일 포인트를 받을 유저를 찾아냅니다.
    const dateId = getFormattedDate(); // 오늘 날짜를 yyyyMMdd 형식으로 가져옴
    const uniqueId = `${userid}-${dateId}`; // 유니크한 ID 생성

    const dailyExists = await dailyPointModel.findOne({
      _id: uniqueId,
    });

    if (!dailyExists) {
      await dailyPointModel.create({
        _id: uniqueId,
        userid,
      });
      const findUser = await UserModel.findOne({ nickname: userid });
      if (findUser) {
        // findUser의 포인트를 30~500포인트 랜덤 지급한다.
        // 랜덤 기준은 작은 포인트가 확률이 높고 포인트가 높을수록 확률이 낮아진다.
        findUser.point = findUser.point + point;
        await findUser.save();
      } else {
        console.error("No user found with the given ID.");
      }
      return new Response(
        JSON.stringify({ message: "일일 포인트 획득 성공", point }),
        {
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "일일 포인트를 이미 지급했습니다." }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving league event:", error);
    return new Response(JSON.stringify({ message: "포인트 전송 실패" }), {
      status: 500,
    });
  }
}
