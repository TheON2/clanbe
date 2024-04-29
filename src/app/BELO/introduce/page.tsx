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

export default function IntroducePage() {
  return (
    <div className="flex flex-wrap justify-center items-start gap-12 mx-auto max-w-8xl w-full">
      <Card
        className={`w-full mt-28 ml-12 mr-12 overflow-visible min-w-[350px]`}
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
            <p className="text-5xl font-bold block text-center">BELO</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="text-2xl text-bold">
              Be + ELO 를 합친 비클랜 내부래더
            </p>
          </div>
          <div className="m-2">
            <p className="text-2xl text-bold">BELO시스템</p>
          </div>
          <div className="m-2">
            <p className="hidden md:block text-2xl text-bold leading-10">
              S+ = 1500점 이상 시작점수 1600점
              <br /> S = 1300 ~ 1500 시작점수 1350점
              <br /> A+ = 1100 ~ 1300 시작점수 1150점
              <br /> A = 1000 ~ 1100 시작점수 1050점
              <br /> B+ = 900 ~ 1000 시작점수 950
              <br /> B = 800 ~ 900 시작점수 850점
              <br /> C= 700 ~ 800 시작점수 750점
              <br /> D = ~ 700 시작점수 650점
            </p>
            <p className="block md:hidden text-2xl text-bold leading-10">
              S+ = 1500점 이상 <br />
              시작점수 1600
              <br /> S = 1300~1500
              <br />
              시작점수 1350점
              <br /> A+ = 1100 ~ 1300
              <br />
              시작점수 1150점
              <br /> A = 1000 ~ 1100 <br />
              시작점수 1050점
              <br /> B+ = 900 ~ 1000 <br />
              시작점수 950
              <br /> B = 800 ~ 900 <br />
              시작점수 850점
              <br /> C= 700 ~ 800 <br />
              시작점수 750점
              <br /> D = ~ 700 <br />
              시작점수 650점
            </p>
          </div>
          <div className="m-2">
            <p className="text-2xl text-bold">
              BELO 서버점수에 따라 <br />
              실시간 티어 승강됩니다.
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`w-full mt-28 ml-12 mr-12 overflow-visible min-w-[350px]`}
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
            <p className="text-5xl font-bold block text-center">진행방식</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="hidden md:block text-2xl text-bold leading-10">
              <br />
              - 경기결과를 통해 승자가 경기등록을 원칙으로 합니다.
              <br />
              <br /> - 등록순서에 따라 점수가 오르고 내리기 때문에
              <br /> 실제경기의 순서대로 등록해주시기 바랍니다.
              <br />
              <br /> - 상대방과의 합의하에 진행한 후 <br />
              승이 더 많은 쪽에서 순서대로 경기결과 작성 바랍니다. <br />
              <br />- 다음 상대와의 경기가 있다면
              <br /> 경기결과를 반드시 작성해 주시고 진행해야
              <br /> BELO점수에 영향이 없습니다.
              <br />
              <br /> - 동일상대와 게임 수 제한 없이 진행 가능합니다.
              <br />
              <br /> - 상대와 합의하에 진행된 BELO만 등록가능합니다. <br />
              <br />- BELO 시스템의 결과로 <br />
              티어배정을 하기때문에 주종대결만 등록가능합니다.
            </p>
            <p className="block md:hidden text-2xl text-bold leading-10">
              <br />
              - 경기결과를 통해 승자가 <br />
              경기등록을 원칙으로 합니다.
              <br />
              <br /> - 등록순서에 따라 점수가 <br />
              오르고 내리기 때문에
              <br /> 실제경기의 순서대로 등록해주시기 바랍니다.
              <br />
              <br /> - 상대방과의 합의하에
              <br /> 진행한 후 승이 더 많은 쪽에서 순서대로 경기결과 작성
              바랍니다. <br />
              <br />- 다음 상대와의 경기가 <br />
              있다면 경기결과를 반드시 작성해 주시고 진행해야
              <br /> BELO점수에 영향이 없습니다.
              <br />
              <br /> - 동일상대와 게임 수 제한 없이 진행 가능합니다.
              <br />
              <br /> - 상대와 합의하에 진행된 BELO만 등록가능합니다. <br />
              <br />- BELO 시스템의 결과로 <br />
              티어배정을 하기때문에
              <br /> 주종대결만 등록가능합니다.
            </p>
          </div>
        </CardBody>
      </Card>
      <Card
        className={`w-full mt-28 ml-12 mr-12 overflow-visible min-w-[350px]`}
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
            <p className="text-5xl font-bold block text-center">티어기준</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 text-center min-h-[320px]">
          <div className="m-2">
            <p className="hidden md:block text-2xl text-bold leading-10">
              - 비클랜 티어는 S A B C D E 로 구분합니다. <br />
              <br /> - 클랜가입시 티어배정담당 운영진의 권한으로
              <br /> 최초의 티어가 배정되는 시점과 함께 BELO에 참가가능합니다.{" "}
              <br />
              <br /> - 래더는 티어의 제한없이 가능합니다.
              <br />
              <br /> - 티어배치가 된 클랜원 중 티어재배치가 판단되는 인원은
              마스터와 티어배정담당자의 권한으로 티어가 재배치 될 수 있습니다.
              <br /> <br /> - BELO에 참여하지 않는 인원은 <br /> BPL(BeClan Pro
              League)에 참가에 제한이 있을 수 있습니다. <br /> <br /> - BELO
              리셋 시기 (분기별) <br /> <br /> - BELO 성적을 통해 프로리그 티어
              조정 가능유무
              <br />
              (단, 비엘오만으로 판단 X , 시점은 프로리그 공지나
              <br /> 프로리그 없는 경우 일정 기간 지난 후)
            </p>
            <p className="block md:hidden text-2xl text-bold leading-10">
              - 비클랜 티어는
              <br /> S A B C D E 로 구분합니다. <br />
              <br /> - 클랜가입시 티어배정담당 운영진의 권한으로
              <br /> 최초의 티어가 배정되는 <br />
              시점과 함께 BELO에
              <br /> 참가가능합니다. <br />
              <br /> - 래더는 티어의 제한없이
              <br /> 가능합니다.
              <br />
              <br /> - 티어배치가 된 클랜원 중 티어재배치가 판단되는
              <br /> 인원은 마스터와 <br />
              티어배정담당자의 권한으로
              <br /> 티어가 재배치 될 수 있습니다.
              <br /> <br /> - BELO에
              <br /> 참여하지 않는 인원은 <br /> BPL(BeClan Pro League)에 참가에
              제한이 있을 수 있습니다. <br /> <br /> - BELO 리셋 시기 (분기별){" "}
              <br /> <br /> - BELO 성적을 통해 프로리그 티어 조정 가능유무
              <br />
              (단, 비엘오만으로 판단 X , 시점은 프로리그 공지나
              <br /> 프로리그 없는 경우 일정 기간 지난 후)
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
