"use client";

import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Support } from "../../types/types";
import { formatRelativeDate } from "@/utils/dateUtils";
import styles from "../styles/style.module.css";

const getCurrentMonthTotal = (supports: Support[]) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return supports
    .filter((support) => {
      const supportDate = new Date(support.createdAt);
      return (
        supportDate.getMonth() === currentMonth &&
        supportDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, support) => {
      if (support.type === 1) return sum + support.amount;
      if (support.type === 2) return sum - support.amount;
      return sum;
    }, 0);
};

const SupportPost = ({ supports, allSupports }: any) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);

  useEffect(() => {
    const total = supports.reduce((sum: number, support: Support) => {
      if (support.type === 1) return sum + support.amount;
      if (support.type === 2) return sum - support.amount;
      return sum;
    }, 0);
    const monthlyTotal = getCurrentMonthTotal(supports);

    setTotalAmount(total);
    setMonthlyAmount(monthlyTotal);
  }, [supports]);

  const receivedSupports = supports.filter(
    (support: Support) => support.type === 1
  );
  const receivedAllSupports = allSupports.filter(
    (support: Support) => support.type === 1
  );

  if (receivedSupports.length === 0 || receivedAllSupports.length === 0)
    return null;

  console.log(supports);

  return (
    <Card className={`w-full max-h-[600px] lg:w-1/2 ${styles.customCard}`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={100} src="/Belogo.png" width={100} />
        <div className="flex flex-col">
          <Link href={"/CLANBE/notices"}>
            <p className="text-lg font-bold hover:text-blue-default cursor-pointer">
              클랜 후원
            </p>
          </Link>
          <p className="text-small text-default-500">운영금액 및 감사한분들</p>
        </div>
        <Divider orientation="vertical" />
        <div className="flex items-center m-2 gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-xl">
              총액 {totalAmount.toLocaleString()}원
            </p>
            <p className="font-bold text-md text-blue">
              이달의 도움 {monthlyAmount.toLocaleString()}원
            </p>
            {/* <p className="font-bold text-md text-blue">이달의 사용 60,000원</p> */}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Tabs aria-label="Options">
          <Tab key="option1" title="누적금액">
            {supports.map((support: Support, index: number) => (
              <Card key={support._id} className="my-2 pl-2 pt-2">
                <div className="flex items-center mb-4">
                  <div className="font-bold text-2xl pl-4 w-1/5">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-4 w-2/5">
                    <Avatar
                      src={support.user?.avatar || "/default-avatar.png"} // 기본 아바타 이미지 추가
                      className="w-12 h-12 text-large"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-2xl">{support.nickname}</p>
                      <p className="font-bold text-md text-blue">
                        @{support.user?.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold md:text-3xl text-xl w-2/5">
                    {support.amount.toLocaleString()}원
                  </p>
                </div>
              </Card>
            ))}
          </Tab>
          <Tab key="option2" title="최신">
            {allSupports.map((support: Support, index: number) => (
              <Card key={support._id} className="my-2 pl-2 pt-2">
                <div className="flex items-center mb-4">
                  <div className="flex items-center gap-4 w-2/5 mr-4">
                    <Avatar
                      src={support.user?.avatar || "/default-avatar.png"} // 기본 아바타 이미지 추가
                      className="w-12 h-12 text-large"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-2xl">{support.nickname}</p>
                      <p className="font-bold text-md text-blue">
                        @{support.user?.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold md:text-3xl text-xl w-2/5">
                    {support.amount.toLocaleString()}원
                  </p>
                  <div className="font-bold text-md w-1/5">
                    {formatRelativeDate(support.createdAt)}
                  </div>
                </div>
              </Card>
            ))}
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default SupportPost;
