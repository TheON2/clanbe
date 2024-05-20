"use client";

import {
  Button,
  Card,
  Divider,
  Input,
  Link,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getNavData, getUsers } from "@/service/user";
import { Team } from "../../types/types";
import UserNav from "./UserNav/UserNav";
import { User as MyUser } from "next-auth";

export default function MobileUserComponent({ teams, users, points }: any) {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  if (!isLoggedIn) {
    return (
      <Card className="p-4 flex flex-col items-center justify-center w-full h-32">
        <p>로그인을 해주세요.</p>
        <Link href="/AUTH/signin">
          <Button color="primary" size="sm">
            로그인
          </Button>
        </Link>
      </Card>
    );
  }

  return user ? (
    <UserNav user={user} teams={teams} users={users} points={points} />
  ) : (
    // 유효하지 않은 user 객체의 경우 대체 UI 표시
    <Card className="p-4 flex flex-col items-center justify-center w-full h-32">
      <p>로그인을 해주세요.</p>
      <Link href="/AUTH/signin">
        <Button color="primary" size="sm">
          로그인
        </Button>
      </Link>
    </Card>
  );
}
