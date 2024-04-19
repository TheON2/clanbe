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
import { useState } from "react";

export default function SignInPage() {
  const placements = ["inside", "outside", "outside-left"];
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const [signUpState, setSignUpState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const canSubmit = () => {
    const hasErrors = Object.values(error).some((e) => e !== "");
    const hasEmptyFields = !signUpState.password || !signUpState.email;
    return !hasErrors && !hasEmptyFields;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      if (value.length > 0 && !validateEmail(signUpState.email)) {
        setError((prev) => ({
          ...prev,
          email: "이메일 형식이 문제가 참 많습니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "password") {
      if (value.length > 0 && value.length < 8) {
        setError((prev) => ({
          ...prev,
          password: "비밀번호는 8자 이상이어야 합니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpState }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message);

      window.location.href = `/`;
    } catch (error) {
      console.error("Failed to submit the article:", error);
      alert(error);
    }
  };

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
              type="email"
              name="email"
              label="Email"
              labelPlacement={"outside"}
              placeholder="Email을 입력해주세요."
              value={signUpState.email}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.email.length >= 1}
              errorMessage={error.email}
            />
            <Input
              type="password"
              name="password"
              label="비밀번호"
              labelPlacement={"outside"}
              placeholder="비밀번호를 입력해주세요. [8자 이상]"
              value={signUpState.password}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.password.length >= 1}
              errorMessage={error.password}
            />

            <div className="flex justify-center gap-4 p-4">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                color="success"
                className={`min-w-[250px] ${
                  canSubmit() ? "" : "bg-gray-400 hover:bg-gray-400"
                }`}
              >
                회원가입
              </Button>
            </div>
            <p className="pb-4">아이디를 잃어버리셨나요? 아이디찾기</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
