import PointModel from "@/models/point";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const { senduser, receiveuser, point , message } = body;

    // 보내는 유저와 받는 유저를 찾아냅니다.
    const sender = await UserModel.findById(senduser);
    const receiver = await UserModel.findById(receiveuser);

    if (!sender || !receiver) {
      return new Response(JSON.stringify({ message: "유저를 찾을 수 없습니다." }), {
        status: 404,
      });
    }

    // 포인트 증감 계산
    const sbeforepoint = sender.point;
    const rbeforepoint = receiver.point;

    if (sbeforepoint < point) {
      return new Response(JSON.stringify({ message: "잔액이 부족합니다." }), {
        status: 400,
      });
    }

    const safterpoint = sbeforepoint - point;
    const rafterpoint = rbeforepoint + point;

    // 유저 포인트 업데이트
    sender.point = safterpoint;
    receiver.point = rafterpoint;

    await sender.save();
    await receiver.save();

    // 포인트 전송 기록 저장
    const newPoint = new PointModel({
      senduser: senduser,
      receiveuser: receiveuser,
      sbeforepoint: sbeforepoint,
      safterpoint: safterpoint,
      rbeforepoint: rbeforepoint,
      rafterpoint: rafterpoint,
      point: point,
      message:message,
    });

    await newPoint.save();

    return new Response(JSON.stringify({ message: "포인트 전송 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving league event:", error);
    return new Response(JSON.stringify({ message: "포인트 전송 실패" }), {
      status: 500,
    });
  }
}
