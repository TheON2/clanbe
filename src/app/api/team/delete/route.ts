import mongoose from "mongoose";
import TeamModel from "@/models/team";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { name } = body;

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const deletedTeam = await TeamModel.findOneAndDelete({ name: name });

    if (!deletedTeam) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 팀입니다." }),
        {
          status: 409,
        }
      );
    }

    return new Response(JSON.stringify({ message: "삭제 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "삭제 실패" }), {
      status: 500,
    });
  }
}
