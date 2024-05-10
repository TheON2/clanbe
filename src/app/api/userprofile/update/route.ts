import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { email, password, nickname, name, kakao, birth, message:stateMessage } = body.signUpState;

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

    // 중복 검사를 수행합니다: 닉네임, 이름, 카카오 ID
    const duplicateUser = await UserModel.findOne({
      _id: { $ne: existingUser._id }, // 현재 사용자를 제외
      $or: [
        { nickname: nickname },
        { name: name },
        { kakao: kakao }
      ],
    });

    if (duplicateUser) {
      let message = "다음 항목이 중복됩니다:";
      if (duplicateUser.nickname === nickname) {
        message += " 닉네임";
      }
      if (duplicateUser.name === name) {
        message += " 이름";
      }
      if (duplicateUser.kakao === kakao) {
        message += " 카카오 ID";
      }
      return new Response(JSON.stringify({ message }), {
        status: 409,
      });
    }

    console.log(existingUser);
    console.log(stateMessage);
    
    existingUser.nickname = nickname;
    existingUser.name = name;
    existingUser.kakao = kakao;
    existingUser.birth = birth;
    existingUser.message = stateMessage;

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
