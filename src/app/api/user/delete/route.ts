import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  console.log(body)
  let { nickname } = body;


  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const existingUser = await UserModel.findOneAndDelete({ nickname:nickname })


    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 유저입니다." }),
        {
          status: 409,
        }
      );
    }

    return new Response(JSON.stringify({ user:existingUser,message:"유저 삭제 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
