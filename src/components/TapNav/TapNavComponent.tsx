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
import { Team } from "../../../types/types";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useSession } from "next-auth/react";
import UserNav2 from "../UserNav2";
import { useRouter } from "next/navigation";
import UserNav from "../UserNav/UserNav";
import { User as MyUser } from "next-auth";

type TapNavProps = {
  teams: Team[];
  users: MyUser[];
};

const TapNavComponent = ({ teams,users }: TapNavProps) => {
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  return (
    <div className="hidden sm:block mx-4 sticky top-20 w-[280px] ">
      {isLoggedIn && user ? (
        <UserNav user={user} teams={teams} users={users} />
      ) : (
        <UserNav2 />
      )}
      {/* <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"후원"} title={"후원"}>
          <Card>
            <CardHeader>
              <p className="text-lg font-bold">후원자 명단</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"포인트"} title={"포인트"}>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key={"최신댓글"} title={"최신댓글"}>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs> */}
      <ThemeSwitcher />
    </div>
  );
};

export default TapNavComponent;