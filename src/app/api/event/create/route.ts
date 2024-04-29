import mongoose from "mongoose";
import EventModel from "@/models/event";

export async function POST(req: Request) {
  const body = await req.json();

  let { title, date, description, author } = body;
  try {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
      
      console.log(body)

    const event = new EventModel({
      title,
      date,
      description,
      author,
    });

    try {
      await event.save();
      console.log("이벤트 저장 성공");
      return new Response(
        JSON.stringify({
          message: "이벤트 저장성공",
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("이벤트 저장 실패:", error);
      // 오류의 자세한 내용을 확인하기 위해 error 객체 전체를 출력
      console.error(error);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
