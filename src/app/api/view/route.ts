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

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const dateId = getFormattedDate(); // 오늘 날짜를 yyyyMMdd 형식으로 가져옴
    const uniqueId = `${userid}-${postid}-${dateId}`; // 유니크한 ID 생성

    const viewExists = await viewDateModel.findOne({
      _id: uniqueId,
    });

    if (!viewExists) {
      await viewDateModel.create({
        _id: uniqueId,
        userid,
        postid,
      });
      const post = await PostModel.findById(postid);
      if (post) {
        post.view = (post.view || 0) + 1;
        await post.save();
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
