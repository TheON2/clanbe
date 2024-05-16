"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { useRouter } from "next/navigation";
import { getPosts } from "../service/posts";
import { Post } from "../../types/types";
import { formatDate, formatRelativeDate } from "@/utils/dateUtils";
import { categoryLabels } from "../../public/data";
import { PostData } from "@/service/posts";
import Link from "next/link";

const Notice = ({ notices }: any) => {
  const labels = categoryLabels;
  const router = useRouter();

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "공지사항":
        return "/CLANBE/notices";
      case "클랜 후원":
        return "/CLANBE/support";
      case "자유게시판":
        return "/COMMUNITY/forum";
      case "가입인사":
        return "/COMMUNITY/introduce";
      case "건의사항":
        return "/COMMUNITY/feedback";
      case "전략전술":
        return "/COMMUNITY/tactics";
      case "출석체크":
        return "/COMMUNITY/dailycheckin";
      case "랭킹전":
        return "/LEAGUE/ranking";
      case "이벤트":
        return "/LEAGUE/event";
      case "외부리그":
        return "/LEAGUE/opponent";
      case "끝장전":
        return "/LEAGUE/versus";
      case "프로리그":
        return "/PROLEAGUE/notice";
      default:
        return "/"; // 기본 경로
    }
  };

  // 제목이 14글자를 넘으면 '...'으로 처리하는 함수
  const formatTitle = (title: string) => {
    return title.length > 15 ? `${title.substring(0, 14)} ...` : title;
  };

  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard}`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
        <div className="flex flex-col">
          <Link href={"/CLANBE/notices"}>
            <p className="text-lg font-bold hover:text-blue-default cursor-pointer">
              공지 사항
            </p>
          </Link>
          <p className="text-small text-default-500">클랜 공지 모음</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="mt-3">
        {notices.map((notice: Post) => (
          <div key={notice._id} className="flex gap-4 my-2 items-center">
            <div>
              <Button
                className="h-[30px] w-[100px]"
                radius="full"
                color="primary"
                variant="ghost"
                onClick={() => {
                  const path = getCategoryPath(categoryLabels[notice.category]);
                  router.push(`${path}`);
                }}
              >
                {labels[notice.category]}
              </Button>
            </div>
            <div className="flex-auto truncate overflow-hidden">
              <Link href={`/post/read/${notice._id}/${notice.category}`}>
                <p className="hidden md:block truncate text-sm md:text-md hover:text-blue-500 cursor-pointer">
                  {notice.title}
                </p>
                <p className="block md:hidden truncate text-sm md:text-md hover:text-blue-500 cursor-pointer">
                  {formatTitle(notice.title)}
                </p>
              </Link>
            </div>
            <div className="">
              <p className="hidden md:block ml-auto text-xs whitespace-nowrap">
                {formatDate(notice.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default Notice;
