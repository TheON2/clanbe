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

export default function MobileUserComponent() {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  const [teams, setTeams] = useState<Team[]>([]);
  const [userData, setUserData] = useState<MyUser[]>([]);

  useEffect(() => {
    // 내부에서 비동기 함수 선언
    const fetchData = async () => {
      const { teams, users } = await getNavData();
      //const users = await getUsers();
      setTeams(teams); // 팀 데이터 설정
      setUserData(users.users);
    };

    if (isLoggedIn) {
      fetchData().catch(console.error); // 에러 처리를 위한 catch 추가
    }
  }, [isLoggedIn, setTeams]); // isLoggedIn이 변경될 때만 실행

  if (!isLoggedIn) {
    return (
      <Card className="p-4 flex flex-col items-center justify-center w-full h-32">
        <p>로그인을 해주세요.</p>
        <Link href="/api/auth/signin">
          <Button color="primary" size="sm">
            로그인
          </Button>
        </Link>
      </Card>
    );
  }

  return user ? (
    <UserNav user={user} teams={teams} users={userData} />
  ) : (
    // 유효하지 않은 user 객체의 경우 대체 UI 표시
    <Card className="p-4 flex flex-col items-center justify-center w-full h-32">
      <p>로그인을 해주세요.</p>
      <Link href="/api/auth/signin">
        <Button color="primary" size="sm">
          로그인
        </Button>
      </Link>
    </Card>
  );
}
