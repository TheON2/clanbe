"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import styles from "../../../styles/style.module.css";

export default function RulesPage() {
  return (
    <div className="flex flex-wrap justify-center items-start gap-12 mx-auto max-w-8xl w-full">
      <Card
        className={`w-full mt-28 ml-12 mr-12 overflow-visible min-w-[310px]`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-dark absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="/Belogo.png"
              width={250}
              height={250}
              style={{ filter: "invert(100%)" }}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="md:text-5xl text-2xl font-bold block text-center">
              포인트 규정
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="md:text-2xl text-md text-bold">
              ClanBe홈페이지의 포인트는 <br />
              현금화 가능 시스템입니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-2xl text-bold">1Point = 1원</p>
          </div>
          <div className="m-2">
            <p className="md:text-2xl text-md text-bold leading-10">
              회원가입시 2000P
              <br />
              출석체크 200P
              <br />
              포로리그 참가비 1000P
              <br />
              타클랜프로리그 참여시 500P
              <br />
              치킨리그 참여시 1000P
              <br />
              게시글 작성 (1일3개제한) 10P
              <br />
              댓글 작성시 (1일10개제한) 3P
            </p>
          </div>
          <div className="m-2">
            <p className="md:text-2xl text-md text-bold">
              후원금 당 10%를 포인트로 적립
              <br />
              아이디변경 -1000P <br />
              (가입 후 7일 이내는 무료)
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
