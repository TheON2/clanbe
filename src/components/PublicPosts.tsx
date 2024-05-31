"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { categoryLabels } from "../../public/data";
import { useRouter } from "next/navigation";
import { Post } from "../../types/types";
import { getPosts } from "../service/posts";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";

const PublicPosts = ({ posts }: any) => {
  const router = useRouter();
  const labels = categoryLabels;

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "공지사항":
        return "/clanbe/notices";
      case "클랜 후원":
        return "/clanbe/support";
      case "자유게시판":
        return "/community/forum";
      case "가입인사":
        return "/community/introduce";
      case "건의사항":
        return "/community/feedback";
      case "전략전술":
        return "/community/tactics";
      case "출석체크":
        return "/community/dailycheckin";
      case "랭킹전":
        return "/league/ranking";
      case "이벤트":
        return "/league/event";
      case "외부리그":
        return "/league/opponent";
      case "끝장전":
        return "/league/versus";
      case "프로리그":
        return "/proleague/notice";
      default:
        return "/"; // 기본 경로
    }
  };
  const [board, setBoard] = useState([]);

  // 제목이 14글자를 넘으면 '...'으로 처리하는 함수
  const formatTitle = (title: string) => {
    return title.length > 15 ? `${title.substring(0, 14)} ...` : title;
  };

  useEffect(() => {
    const sortedData = posts.slice(0, 11);
    setBoard(sortedData);
  }, []);

  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard}`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
        <div className="flex flex-col">
          <Link href={"/community/forum"}>
            <p className="text-lg font-bold hover:text-blue-default cursor-pointer">
              클랜 커뮤니티
            </p>
          </Link>
          <p className="text-small text-default-500">전체 게시글</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="mt-3">
        {board.map((board: Post) => (
          <div key={board._id} className="flex gap-4 my-2 items-center">
            <div>
              <Button
                className="h-[30px] w-[100px]"
                radius="full"
                color="primary"
                variant="ghost"
                onClick={() => {
                  const path = getCategoryPath(categoryLabels[board.category]);
                  router.push(`${path}`);
                }}
              >
                {labels[board.category]}
              </Button>
            </div>
            <div className="flex-auto truncate overflow-hidden">
              <div
                onClick={() => {
                  window.location.href = `/post/read/${board._id}/${board.category}`;
                }}
              >
                <p className="hidden md:block truncate text-sm md:text-md hover:text-blue-500 cursor-pointer">
                  {board.title}
                </p>
                <p className="block md:hidden truncate text-sm md:text-md hover:text-blue-500 cursor-pointer">
                  {formatTitle(board.title)}
                </p>
              </div>
            </div>
            <div className="">
              <p className="hidden md:block ml-auto text-xs whitespace-nowrap">
                {formatDate(board.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default PublicPosts;
