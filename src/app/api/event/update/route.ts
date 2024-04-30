import mongoose from "mongoose";
import EventModel from "@/models/event";

export async function POST(req: Request) {
  const body = await req.json();
  let { title, date, description, author, id } = body;

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    const findEvent = await EventModel.findById(id);
    if (!findEvent) {
      return new Response(
        JSON.stringify({ message: "이벤트를 찾을 수 없음" }),
        {
          status: 401,
        }
      );
    }

    findEvent.title = title;
    findEvent.description = description;
    if (date !== "") findEvent.date = date;

    await findEvent.save();

    console.log("이벤트 수정 성공");
    return new Response(
      JSON.stringify({
        message: "이벤트 수정 성공",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("이벤트 수정 실패:", error);
    // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
    console.error(error);
  }
}
