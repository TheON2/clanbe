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
              src="https://img.icons8.com/ios/100/swearing-male.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">욕설</p>
            <p className="text-xl text-gray-500 block text-center">
              비하발언 및 클랜이미지 실추등
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              클랜ID는 물론이며 배틀태그ID로도
              <br />
              비매너행위는 일체 금합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">
              해명의경우 당사자만 가능하며
              <br />
              리플레이 제출시 운영진측 판단
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">3항</p>
            <p className="text-lg">
              리플판독 결과에 따라
              <br />
              경고 및 제명
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://img.icons8.com/ios-filled/100/laptop-coding.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">
              불법프로그램사용
            </p>
            <p className="text-xl text-gray-500 block text-center">
              맵핵 / 미네랄핵 / etc
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              맵핵 포함 치팅 프로그램 사용을
              <br />
              일체 금지합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">
              고의적인 사기맵 플레이를
              <br />
              일체 금지합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">3항</p>
            <p className="text-lg">
              리플판독 결과에 따라
              <br />
              경고 없이 제명
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://img.icons8.com/ios/100/sparring.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">
              클랜원간 불화
            </p>
            <p className="text-xl text-gray-500 block text-center">
              말싸움 / 파벌 / etc
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              클랜원간 가치관 차이로 인한
              <br />
              논쟁을 넘은 싸움을 금합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">
              논쟁을 넘어 분쟁이 될 경우
              <br />
              운영진 개입 후 시시비비를 가림
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">3항</p>
            <p className="text-lg">
              사건의 결과에 따라
              <br />
              경고 및 제명
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://img.icons8.com/external-outline-geotatah/100/external-clan-estate-planning-outline-geotatah.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">이중클랜</p>
            <p className="text-xl text-gray-500 block text-center">
              타클랜 병행활동
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              BE클랜 활동중 타클랜 활동을
              <br />
              일체 금합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">적발시 제명</p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://img.icons8.com/ios-filled/100/twitch.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">
              방송경기 치팅
            </p>
            <p className="text-xl text-gray-500 block text-center">
              방송경기 중 부정행위
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              방송경기 참여중 방플 / 귀맵을
              <br />
              일체 금합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">
              방송경기 참여자에게
              <br />
              경기정보 전달 및 대리게임을
              <br />
              일체 금합니다.
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">3항</p>
            <p className="text-lg">
              적발시
              <br />
              경기 몰수패 및 경고
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`min-w-[350px] max-w-[400px] mt-24 overflow-visible w-1/3 ${styles.customCard}`}
      >
        <CardHeader className="relative p-0">
          <div className="w-36 h-36 rounded-full bg-blue-500 absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Image
              alt="nextui logo"
              src="https://img.icons8.com/ios-filled/100/box-important--v1.png"
              width={100}
              height={100}
            />
          </div>
          <div className="relative pt-20 px-4 pb-4 w-full">
            <p className="text-4xl font-bold block text-center">경고</p>
            <p className="text-xl text-gray-500 block text-center">
              규정에 의거한 모든 경고
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-1xl">1항</p>
            <p className="text-lg">
              규정위반시 모든 경고는
              <br />
              통합되어 처리된다.
              <br />
              2경고 발생사안시 2경고 지급
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">2항</p>
            <p className="text-lg">
              모든 경고는 부과일 기준
              <br />
              6개월 이후 삭제
            </p>
          </div>
          <div className="m-2">
            <p className="text-1xl">3항</p>
            <p className="text-lg">
              경고3회 누적시
              <br />
              제명
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
