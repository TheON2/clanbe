"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tab,
  Tabs,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserTwitterCard } from "../UserTwitterCard";
import { tabs } from "../../../public/data";
import { Point, Team } from "../../../types/types";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useSession } from "next-auth/react";
import NotLoggedUserNav from "../UserNav/NotLoggedUserNav";
import { useRouter } from "next/navigation";
import UserNav from "../UserNav/UserNav";
import { User as MyUser } from "next-auth";

type TapNavProps = {
  teams: Team[];
  users: MyUser[];
  points: Point[];
};

const TapNavComponent = ({ teams, users, points }: TapNavProps) => {
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  return (
    <div className="hidden md:block mx-4 sticky top-20 w-[220px] ">
      {isLoggedIn && user ? (
        <UserNav user={user} teams={teams} users={users} points={points} />
      ) : (
        <NotLoggedUserNav />
      )}
      <ThemeSwitcher />
    </div>
  );
};

export default TapNavComponent;
