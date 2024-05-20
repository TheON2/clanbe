import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { uploadImage } from "@/service/posts";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { email, password, nickname, name, kakao, birth, race, phone, idData } =
    body.signUpState;

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    // 이메일, 닉네임, 카카오 ID 중복 검사
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { nickname }, { kakao }, { phone }],
    });

    if (existingUser) {
      // 중복되는 요소에 따라 다른 메시지 반환
      let message = "이미 등록된 정보입니다:";
      if (existingUser.email === email) {
        message += " 이메일";
      }
      if (existingUser.nickname === nickname) {
        message += " 닉네임";
      }
      if (existingUser.kakao === kakao) {
        message += " 카카오 ID";
      }
      if (existingUser.phone === phone) {
        message += "전화번호";
      }
      return new Response(JSON.stringify({ message }), {
        status: 409,
      });
    }

    let fileUrl

    if (idData) {
      const blob = await fetch(idData).then((res) => res.blob());
      fileUrl = await uploadImage(blob as File);
    }

    console.log(fileUrl)

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); // 10은 솔트 라운드 수입니다.

    const myProfile = {
      email,
      password: hashedPassword, // 해싱된 비밀번호 저장
      nickname,
      name,
      kakao,
      birth,
      phone,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      role: "Guest",
      grade: 0,
      point: 0,
      tear: "미배정",
      BELO: { race: race, pw: 0, pl: 0, tw: 0, tl: 0, zw: 0, zl: 0, belo: 0 },
      league:{race: race, pw: 0, pl: 0, tw: 0, tl: 0, zw: 0, zl: 0,},
      team: "미배정",
      idData:fileUrl,
    };

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
