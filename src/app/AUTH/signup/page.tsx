"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { Signup } from "../../../../types/types";
import Link from "next/link";

export default function SignUpPage() {
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  const [signUpState, setSignUpState] = useState<Signup>({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
    phone: "",
    idData: "",
  });
  const [error, setError] = useState<Signup>({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
    phone: "",
    idData: "",
  });

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleRaceClick = (race: string) => {
    setSignUpState((prev) => ({
      ...prev,
      race: race,
    }));
  };

  const [newPreviewImage, setNewPreviewImage] = useState("");

  const handleNewImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("진입");
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPreviewImage(reader.result as string);
        setSignUpState((prev) => ({
          ...prev,
          idData: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ID 유효성 검사
    if (name === "nickname") {
      if (value.length > 0 && value.length < 2) {
        setError((prev) => ({
          ...prev,
          nickname: "닉네임은 2자 이상이어야 합니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, nickname: "" }));
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

    if (name === "race") {
      if (value.length === 0) {
        setError((prev) => ({
          ...prev,
          race: "종족을 선택해 주세요",
        }));
      } else {
        setError((prev) => ({ ...prev, race: "" }));
      }
    }

    if (name === "phone") {
      if (value.length > 0 && !validatePhoneNumber(value)) {
        setError((prev) => ({
          ...prev,
          phone: "휴대폰 번호 형식이 유효하지 않습니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const canSubmit = () => {
    const hasErrors = Object.values(error).some((e) => e !== "");
    const hasEmptyFields =
      !signUpState.nickname ||
      !signUpState.password ||
      !signUpState.passwordConfirm ||
      !signUpState.email ||
      !signUpState.name ||
      !signUpState.kakao ||
      !signUpState.birth ||
      !signUpState.race ||
      !signUpState.phone ||
      !signUpState.idData;

    return !hasErrors && !hasEmptyFields;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpState }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = `/`;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  console.log(signUpState);

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
              type="text"
              name="nickname"
              label="닉네임"
              labelPlacement={"outside"}
              value={signUpState.nickname}
              placeholder="클랜닉네임을 입력해주세요. [2~16자]"
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.nickname.length >= 1}
              errorMessage={error.nickname}
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
              type="text"
              name="phone"
              label="연락처"
              labelPlacement={"outside"}
              placeholder="휴대폰 번호를 입력해주세요."
              value={signUpState.phone}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.phone.length >= 1}
              errorMessage={error.phone}
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
            <p className="text-center">신분증 사진</p>
            <Card className="h-full my-4 w-full">
              <div className="flex flex-col justify-center items-center">
                <p className="text-center">
                  주민등록번호 뒷자리를 가린 <br />
                  이미지를 업로드해주세요.
                </p>
              </div>

              <CardBody className="flex justify-center items-center">
                <Image
                  src={newPreviewImage || "/Belogo.png"}
                  height={200}
                  width={350}
                  alt="team"
                />
              </CardBody>
              <CardFooter>
                <input type="file" onChange={handleNewImageChange} />
              </CardFooter>
            </Card>
            <ButtonGroup>
              <Button
                color={signUpState.race === "z" ? "success" : "default"}
                onClick={() => handleRaceClick("z")}
              >
                저그
              </Button>
              <Divider orientation="vertical" />
              <Button
                color={signUpState.race === "t" ? "success" : "default"}
                onClick={() => handleRaceClick("t")}
              >
                테란
              </Button>
              <Divider orientation="vertical" />
              <Button
                color={signUpState.race === "p" ? "success" : "default"}
                onClick={() => handleRaceClick("p")}
              >
                프로토스
              </Button>
            </ButtonGroup>
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
            <Link href={"/auth/signin"}>
              <p className="pb-4">이미 아이디가 있으신가요? 로그인</p>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
