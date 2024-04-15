"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board, posts } from "../../../../public/data";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

export default function SignInPage() {
  const placements = ["inside", "outside", "outside-left"];
  return (
    <div className="w-full max-w-[500px] mt-8 mx-auto">
      <Card className="w-full mx-auto">
        <CardHeader className="flex justify-center items-center px-4 py-2">
          <div className="text-bold text-xl">회원 가입</div>
        </CardHeader>
        <Divider />
        <div className="flex flex-col gap-4 px-4 items-center text-center">
          <div className="w-4/5">
            <Input
              type="id"
              label="ID"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type="password"
              label="비밀번호"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type="password"
              label="비밀번호 확인"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type="email"
              label="Email"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type=""
              label="이름"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type="email"
              label="카톡아이디"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <Input
              type="email"
              label="생일"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              className="py-4"
              size="lg"
            />
            <div className="flex justify-center gap-4 p-4">
              <Button className="min-w-[200px]">회원가입</Button>
            </div>
            <p className="pb-4">이미 아이디가 있으신가요? 로그인</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
