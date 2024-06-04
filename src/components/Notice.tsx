"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { useRouter } from "next/navigation";
import { getPosts } from "../service/posts";
import { Post } from "../../types/types";
import { formatDate, formatRelativeDate } from "@/utils/dateUtils";
import { categoryLabels, getCategoryPath } from "../../public/data";
import { PostData } from "@/service/posts";
import Link from "next/link";

const Notice = ({ notices }: any) => {
  const labels = categoryLabels;
  const router = useRouter();

  // 제목이 14글자를 넘으면 '...'으로 처리하는 함수
  const formatTitle = (title: string) => {
    return title.length > 15 ? `${title.substring(0, 14)} ...` : title;
  };

  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard}`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
        <div className="flex flex-col">
          <Link href={"/clanbe/notices"}>
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
              <div
                className="hidden md:block truncate text-sm md:text-md hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  window.location.href = `/post/read/${notice._id}/${notice.category}`;
                }}
              >
                {notice.title}
              </div>
              <div
                className="block md:hidden truncate text-sm md:text-md hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  window.location.href = `/post/read/${notice._id}/${notice.category}`;
                }}
              >
                {formatTitle(notice.title)}
              </div>
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
