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
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={60}
              height={60}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">욕설</p>
            <p className="text-xl text-gray-500 block text-center">
              비하발언 및 클랜이미 실추등
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center">
          <p className="text-2xl">1항</p>
          <p>클랜ID는 물론이며 배틀태그ID로도 비매너행위는 일체 금합니다.</p>
          <p className="text-2xl">2항</p>
          <p>해명의경우 당사자만 가능하며 리플레이 제출시 운영진측 판단</p>
          <p className="text-2xl">3항</p>
          <p>운영진 리플레이 판독시 당사자측 문제라 판단될경우 경고 및 제명</p>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={60}
              height={60}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">욕설</p>
            <p className="text-xl text-gray-500 block text-center">
              비하발언 및 클랜이미 실추등
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center">
          <p className="text-2xl">1항</p>
          <p>클랜ID는 물론이며 배틀태그ID로도 비매너행위는 일체 금합니다.</p>
          <p className="text-2xl">2항</p>
          <p>해명의경우 당사자만 가능하며 리플레이 제출시 운영진측 판단</p>
          <p className="text-2xl">3항</p>
          <p>운영진 리플레이 판독시 당사자측 문제라 판단될경우 경고 및 제명</p>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={60}
              height={60}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">욕설</p>
            <p className="text-xl text-gray-500 block text-center">
              비하발언 및 클랜이미 실추등
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center">
          <p className="text-2xl">1항</p>
          <p>클랜ID는 물론이며 배틀태그ID로도 비매너행위는 일체 금합니다.</p>
          <p className="text-2xl">2항</p>
          <p>해명의경우 당사자만 가능하며 리플레이 제출시 운영진측 판단</p>
          <p className="text-2xl">3항</p>
          <p>운영진 리플레이 판독시 당사자측 문제라 판단될경우 경고 및 제명</p>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={60}
              height={60}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">욕설</p>
            <p className="text-xl text-gray-500 block text-center">
              비하발언 및 클랜이미 실추등
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center">
          <p className="text-2xl">1항</p>
          <p>클랜ID는 물론이며 배틀태그ID로도 비매너행위는 일체 금합니다.</p>
          <p className="text-2xl">2항</p>
          <p>해명의경우 당사자만 가능하며 리플레이 제출시 운영진측 판단</p>
          <p className="text-2xl">3항</p>
          <p>운영진 리플레이 판독시 당사자측 문제라 판단될경우 경고 및 제명</p>
        </CardBody>
      </Card>
    </div>
  );
}
