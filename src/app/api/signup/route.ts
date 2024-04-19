import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { id, email, password, nickname, name, kakao, birth } = body.signUpState;

  console.log(body.signUpState);

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const myProfile = {
      id,
      email,
      password,
      nickname,
      name,
      kakao,
      birth,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      role: "신입",
      grade: 1,
      point: 0,
      tear: "미배정",
      BELO: { race: "P", pw: 0, pl: 0, tw: 0, tl: 0, zw: 0, zl: 0 },
      team: "미배정",
    }

    const user = new UserModel(myProfile);
    await user.save(); // 데이터베이스에 저장

    return new Response(JSON.stringify({ message: "회원가입 성공" }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "회원가입 실패" }), {
      status: 500,
    });
  }
}
