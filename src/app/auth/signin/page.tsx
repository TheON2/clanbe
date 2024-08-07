"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";

export default function SignInPage() {
  const router = useRouter();
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const [signInState, setsignInState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const canSubmit = () => {
    const hasErrors = Object.values(error).some((e) => e !== "");
    const hasEmptyFields = !signInState.password || !signInState.email;
    return !hasErrors && !hasEmptyFields;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setsignInState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // 기본 제출 동작 막기
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: signInState.email,
        password: signInState.password,
      });

      if (result?.error) {
        // 로그인 실패 시 에러 메시지 처리
        alert("아이디와 비밀번호를 확인해주세요.");
        return;
      } else {
        // 로그인 성공 시 홈 페이지로 리디렉트
        router.push("/");
      }
    } catch (error) {
      // 네트워크 오류나 기타 예외 처리
      console.error("로그인 과정에서 오류가 발생했습니다:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // 이메일 유효성 검사를 useEffect 내부로 이동
    if (signInState.email.length > 0 && !validateEmail(signInState.email)) {
      setError((prev) => ({
        ...prev,
        email: "이메일 형식이 문제가 참 많습니다.",
      }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  }, [signInState.email]); // 이메일 상태가 변경될 때만 실행

  // 비밀번호 상태에 대해서도 비슷한 접근 방식 사용
  useEffect(() => {
    if (signInState.password.length > 0 && signInState.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "비밀번호는 8자 이상이어야 합니다.",
      }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  }, [signInState.password]);

  return (
    <div className="w-full max-w-[500px] mt-8 mx-auto">
      <Card className="w-full mx-auto">
        <CardHeader className="flex justify-center items-center px-4 py-2">
          <div className="text-bold text-xl">로그인</div>
        </CardHeader>
        <Divider />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-4 items-center text-center"
        >
          <div className="w-4/5">
            <Input
              type="email"
              name="email"
              label="Email"
              labelPlacement={"outside"}
              placeholder="Email을 입력해주세요."
              value={signInState.email}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.email.length >= 1}
              errorMessage={error.email}
              autoComplete="email"
            />
            <Input
              type="password"
              name="password"
              label="비밀번호"
              labelPlacement={"outside"}
              placeholder="비밀번호를 입력해주세요. [8자 이상]"
              value={signInState.password}
              className="py-4"
              size="lg"
              onChange={handleInputChange}
              isInvalid={error.password.length >= 1}
              errorMessage={error.password}
              autoComplete="current-password"
            />
            <div className="flex justify-center gap-4 p-4">
              <Button
                type="submit"
                disabled={!canSubmit()}
                color="success"
                className={`min-w-[250px] ${
                  canSubmit()
                    ? "bg-blue-default"
                    : "bg-gray-default hover:bg-gray-default"
                }`}
              >
                로그인
              </Button>
            </div>
            <Link href="/auth/signup">
              <p className="pb-4">회원가입 </p>
            </Link>
            <p className="pb-4">아이디를 잃어버리셨나요? 아이디찾기</p>
          </div>
        </form>
      </Card>
    </div>
  );
}
