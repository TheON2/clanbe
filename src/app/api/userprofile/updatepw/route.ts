import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  console.log(body)
  let { email, password } = body.signUpState;


  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const existingUser = await UserModel.findOne({ email: email })


    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 유저입니다." }),
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    existingUser.password = hashedPassword;

    existingUser.save();

    return new Response(JSON.stringify({ user:existingUser,message:"정보 업데이트 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
