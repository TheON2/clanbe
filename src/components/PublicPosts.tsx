"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { categoryLabels, getCategoryPath } from "../../public/data";
import { useRouter } from "next/navigation";
import { Post } from "../../types/types";
import { getPosts } from "../service/posts";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";

const PublicPosts = ({ posts }: any) => {
  const router = useRouter();
  const labels = categoryLabels;

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
