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
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CheckBoxInterface, Signup } from "../../../../types/types";

export default function SignUpPage() {
  const placements = ["inside", "outside", "outside-left"];
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  const [signUpState, setSignUpState] = useState<Signup>({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
  });
  const [error, setError] = useState<Signup>({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
  });
  const [checkboxes, setCheckboxes] = useState<CheckBoxInterface>({
    checkAll: false,
    checkTerms: false,
    checkPersonalInfo: false,
    checkNewsletter: false,
  });
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState("");
  const [serverError, setServerError] = useState<string>("");
  const [serverNicknameError, setServerNicknameError] = useState<string>("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ID 유효성 검사
    if (name === "id") {
      if (value.length > 0 && value.length < 2) {
        setError((prev) => ({
          ...prev,
          id: "닉네임은 2자 이상이어야 합니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, id: "" }));
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

    if (name === "passwordConfirm") {
      if (
        signUpState.password.length > 0 &&
        value.length > 0 &&
        value !== signUpState.password
      ) {
        setError((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, passwordConfirm: "" }));
      }
    }

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

    if (name === "birth") {
      if (value.length === 0) {
        setError((prev) => ({
          ...prev,
          birth: "생일을 선택해 주세요",
        }));
      } else {
        setError((prev) => ({ ...prev, birth: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpState }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      //window.location.href = `/posts/${response.statusText}`;
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  useEffect(() => {
    console.log(signUpState);
  }, [signUpState]);

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
              type="text"
              name="id"
              label="ID"
              labelPlacement={"outside"}
              value={signUpState.id}
              placeholder="닉네임을 입력해주세요. [2~16자]"
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.id.length >= 1}
              errorMessage={error.id}
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
            <Input
              type="password"
              name="passwordConfirm"
              label="비밀번호 확인"
              labelPlacement={"outside"}
              placeholder="비밀번호를 다시한번 입력해주세요."
              value={signUpState.passwordConfirm}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.passwordConfirm.length >= 1}
              errorMessage={error.passwordConfirm}
            />
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
              type="text"
              name="name"
              label="이름"
              labelPlacement={"outside"}
              placeholder="실제 성명을 입력해주세요."
              value={signUpState.name}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.name.length >= 1}
              errorMessage={error.name}
            />
            <Input
              type="text"
              name="kakao"
              label="카톡아이디"
              labelPlacement={"outside"}
              placeholder="카카오톡 아이디를 입력해주세요."
              value={signUpState.kakao}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.kakao.length >= 1}
              errorMessage={error.kakao}
            />
            <Input
              type="date"
              name="birth"
              label="생일"
              labelPlacement={"outside"}
              placeholder="Enter your email"
              value={signUpState.birth}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.birth.length !== 0}
              errorMessage={error.birth}
            />
            <div className="flex justify-center gap-4 p-4">
              <Button onClick={handleSubmit} className="min-w-[250px]">
                회원가입
              </Button>
            </div>
            <p className="pb-4">이미 아이디가 있으신가요? 로그인</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
