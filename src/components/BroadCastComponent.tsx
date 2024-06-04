"use client";

import React from "react";
import { Post } from "../../types/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import styles from "../styles/style.module.css";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { categoryLabels } from "../../public/data";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/dateUtils";

interface BroadCastComponentProps {
  posts: Post[];
}

const BroadCastComponent: React.FC<BroadCastComponentProps> = ({ posts }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [hydrated, setHydrated] = useState(false);
  const labels = categoryLabels;
  const router = useRouter();

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

  // 제목이 14글자를 넘으면 '...'으로 처리하는 함수
  const formatTitle = (title: string) => {
    return title.length > 15 ? `${title.substring(0, 14)} ...` : title;
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full md:h-[350px] mt-4">
      <div className="flex flex-wrap items-center justify-center gap-2 w-full overflow-auto">
        <div
          className={`w-full md:w-1/2 md:h-[350px] overflow-y-auto ${styles.customCard} flex flex-col gap-2`}
        >
          <Card className="hidden md:block w-full">
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 w-3/5 md:w-2/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/ks/ksmo54/ksmo54.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">구라미스</p>
                  <p className="font-bold text-md">스트리머</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-2/5 md:w-3/5">
                <p className="font-bold text-xl">방송국 주소</p>
                {hydrated && (
                  <Link
                    className="font-bold text-sm cursor-pointer"
                    href="https://bj.afreecatv.com/ksmo54"
                  >
                    {isMobile ? "바로가기" : "https://bj.afreecatv.com/ksmo54"}
                  </Link>
                )}
              </div>
            </div>
          </Card>
          <Card className="block md:hidden w-full">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-between items-center gap-2 w-full px-8">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/ks/ksmo54/ksmo54.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2 flex flex-col items-center w-full">
                  <p className="font-bold text-xl">구라미스</p>
                  <p className="font-bold text-md">스트리머</p>
                  <div className="flex flex-col justify-center">
                    {hydrated && (
                      <Link
                        className="font-bold text-sm cursor-pointer"
                        href="https://bj.afreecatv.com/ksmo54"
                      >
                        {isMobile
                          ? "바로가기"
                          : "https://bj.afreecatv.com/ksmo54"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="hidden md:block w-full">
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 w-3/5 md:w-2/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/eh/ehdnjs1111/ehdnjs1111.jpg?dummy=1716366745576"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">라으페</p>
                  <p className="font-bold text-md">해설BJ</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-2/5 md:w-3/5">
                <p className="font-bold text-xl">방송국 주소</p>
                {hydrated && (
                  <Link
                    className="font-bold text-sm cursor-pointer"
                    href="https://bj.afreecatv.com/ehdnjs1111"
                  >
                    {isMobile
                      ? "바로가기"
                      : "https://bj.afreecatv.com/ehdnjs1111"}
                  </Link>
                )}
              </div>
            </div>
          </Card>
          <Card className="block md:hidden w-full">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-between items-center gap-2 w-full px-8">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/eh/ehdnjs1111/ehdnjs1111.jpg?dummy=1716366745576"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2 flex flex-col items-center w-full">
                  <p className="font-bold text-xl">라으페</p>
                  <p className="font-bold text-md">해설BJ</p>
                  <div className="flex flex-col justify-center">
                    {hydrated && (
                      <Link
                        className="font-bold text-sm cursor-pointer"
                        href="https://bj.afreecatv.com/ehdnjs1111"
                      >
                        {isMobile
                          ? "바로가기"
                          : "https://bj.afreecatv.com/ehdnjs1111"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="hidden md:block w-full">
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 w-3/5 md:w-2/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://i.pinimg.com/736x/69/6c/28/696c28e1ac1e53b7da2747a504c0e144.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">잡 지</p>
                  <p className="font-bold text-md">해설BJ</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-2/5 md:w-3/5">
                <p className="font-bold text-xl">방송국 주소</p>
                {hydrated && (
                  <Link
                    className="font-bold text-sm cursor-pointer"
                    href="https://bj.afreecatv.com/lycosc"
                  >
                    {isMobile ? "바로가기" : "https://bj.afreecatv.com/lycosc"}
                  </Link>
                )}
              </div>
            </div>
          </Card>
          <Card className="block md:hidden w-full">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-between items-center gap-2 w-full px-8">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://i.pinimg.com/736x/69/6c/28/696c28e1ac1e53b7da2747a504c0e144.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2 flex flex-col items-center w-full">
                  <p className="font-bold text-xl">잡 지</p>
                  <p className="font-bold text-md">해설BJ</p>
                  <div className="flex flex-col justify-center">
                    {hydrated && (
                      <Link
                        className="font-bold text-sm cursor-pointer"
                        href="https://bj.afreecatv.com/lycosc"
                      >
                        {isMobile
                          ? "바로가기"
                          : "https://bj.afreecatv.com/lycosc"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Card className={`w-full lg:w-1/2 ${styles.customCard} min-h-[350px]`}>
          <CardHeader className="flex gap-3">
            <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
            <div className="flex flex-col">
              <Link href={"/league/vod"}>
                <p className="text-lg font-bold hover:text-blue-default cursor-pointer">
                  클랜 VOD
                </p>
              </Link>
              <p className="text-small text-default-500">
                클랜관련 방송 VOD 모음
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="mt-3">
            {posts.map((notice: Post) => (
              <div key={notice._id} className="flex gap-4 my-2 items-center">
                <div>
                  <Button
                    className="h-[30px] w-[100px]"
                    radius="full"
                    color="primary"
                    variant="ghost"
                    onClick={() => {
                      const path = getCategoryPath(
                        categoryLabels[notice.category]
                      );
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
      </div>
    </div>
  );
};

export default BroadCastComponent;
