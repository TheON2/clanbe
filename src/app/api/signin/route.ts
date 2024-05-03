import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import TeamModel from "@/models/team";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { email, password } = body.signInState;

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const myProfile = {
      email,
      password,
    };

    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userData = {
          _id:user._id,
          email: user.email,
          nickname: user.nickname,
          name: user.name,
          role: user.role,
          grade: user.grade,
          point: user.point,
          tear: user.tear,
          BELO: user.BELO,
          team: user.team,
          avatar: user.avatar, // 예를 들어 사용자 프로필 이미지 URL
        };
        return new Response(JSON.stringify({ message: "로그인 성공",user: userData }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ message: "비밀번호가 일치하지 않습니다" }),
          {
            status: 401,
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ message: "등록되지 않은 이메일입니다" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "로그인 실패" }), {
      status: 500,
    });
  }
}
