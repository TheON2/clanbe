import PostModel from "@/models/post";
import UserModel from "@/models/user";
import viewDateModel from "@/models/viewdate";
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

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  let { postid, userid } = body.viewData;

  console.log(body);

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    // 오늘 날짜 생성
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 동일 사용자가 같은 게시물을 오늘 이미 조회했는지 확인
    const viewExists = await viewDateModel.findOne({
      userid: userid,
      postid: postid,
      createdAt: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    if (!viewExists) {
      // 조회 기록이 없으면 새로 기록을 추가하고 조회수를 증가
      await viewDateModel.create({
        _id: userid+postid,
        userid,
        postid,
      });
      const post = await PostModel.findById(postid);
      if (post) {
        post.view = (post.view || 0) + 1; // 조회수를 안전하게 증가
        await post.save(); // 변경사항 저장
      } else {
        console.error("No post found with the given ID.");
      }
    }

    return new Response(JSON.stringify({}), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
