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
import { UserTwitterCard } from "./UserTwitterCard";
import { tabs } from "../../public/data";
import { Team } from "../../types/types";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

const TapNavComponent = () => {
  return (
    <div className="hidden sm:block mx-4 sticky top-16 my-32 sm:w-auto">
      <Card className="mb-4">
        <CardBody>
          <div className="flex flex-col justify-center gap-4">
            <Link href="/AUTH/signin" passHref>
              <Button color="primary" className="w-full">
                로그인
              </Button>
            </Link>
            <Link href="/AUTH/signup" passHref>
              <Button color="primary" className="w-full">
                회원가입
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
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
      </Tabs>
      <ThemeSwitcher />
    </div>
  );
};

export default TapNavComponent;
