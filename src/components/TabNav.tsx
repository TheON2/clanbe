"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tab,
  Tabs,
  Tooltip,
  User,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { UserTwitterCard } from "./UserTwitterCard";
import { myProfile, tabs, proleagueTeams } from "../../public/data";

const TapNav = () => {
  // 총 승리, 패배 횟수 및 각 종족별 승률 계산
  const totalWins = myProfile.BELO.pw + myProfile.BELO.tw + myProfile.BELO.zw;
  const totalLosses = myProfile.BELO.pl + myProfile.BELO.tl + myProfile.BELO.zl;

  const totalGames = totalWins + totalLosses;
  const winRateTotal = (totalWins / totalGames) * 100;

  const winRateP =
    (myProfile.BELO.pw / (myProfile.BELO.pw + myProfile.BELO.pl)) * 100;
  const winRateT =
    (myProfile.BELO.tw / (myProfile.BELO.tw + myProfile.BELO.tl)) * 100;
  const winRateZ =
    (myProfile.BELO.zw / (myProfile.BELO.zw + myProfile.BELO.zl)) * 100;

  // 레벨과 경험치 백분율 계산
  const level = Math.floor(myProfile.point / 1000);
  const expPercentage = (myProfile.point % 1000) / 10;

  const myTeam = proleagueTeams.find((team) => team.name === myProfile.team);

  const winRateTeam = myTeam ? (myTeam.w / (myTeam.w + myTeam.l)) * 100 : 0;
  // myTeam이 undefined일 경우 승률을 0으로 설정

  // 팀 이미지 경로 매핑
  const teamImagePaths: { [key: string]: string } = {
    갈락티코: "/grtc.jpg",
    버킹엄: "/bk.jpg",
    원: "/one.jpg",
  };

  // 선택한 팀에 따른 이미지 경로 결정
  const imagePath = teamImagePaths[myProfile.team] || "/default.jpg";

  return (
    <div className="w-[220px] mx-4 sticky top-16 my-32">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"Profile"} title={"Profile"}>
          <Card>
            <CardBody>
              <User
                className="my-4"
                name={myProfile.name}
                description={myProfile.role}
                avatarProps={{
                  src: myProfile.avatar,
                }}
              />
              <br />
              <Progress
                size="sm"
                radius="sm"
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                label={"LV" + level}
                value={expPercentage}
                showValueLabel={true}
              />
              <div className="flex justify-center gap-4">
                <p>회원메뉴</p>
                <p>로그아웃</p>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"BELO"} title={"BELO"}>
          <Card>
            <CardBody className="my-4">
              <User
                name={myProfile.name}
                description={myProfile.role}
                avatarProps={{
                  src: myProfile.avatar,
                }}
              />
              <div className="flex my-4">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={winRateTotal}
                  color="success"
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">
                    {totalWins}W {totalLosses}L
                  </p>
                  <p className="mx-4 font-bold">{myProfile.tear} Tier</p>
                </div>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={winRateP}
                  color="success"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">
                  vs P {myProfile.BELO.pw}W {myProfile.BELO.pl}L
                </p>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={winRateZ}
                  color="success"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">
                  vs Z {myProfile.BELO.zw}W {myProfile.BELO.zl}L
                </p>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={winRateT}
                  color="danger"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">
                  vs T {myProfile.BELO.tw}W {myProfile.BELO.tl}L
                </p>
              </div>
              <div className="flex flex-col gap-4 my-4">
                <Button>BELO 순위</Button>
                <Button>BELO 등록</Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"LEAGUE"} title={"LEAGUE"}>
          <Card>
            <CardBody className="my-4">
              <User
                name={myProfile.name}
                description={myProfile.role}
                avatarProps={{
                  src: myProfile.avatar,
                }}
              />
              <Image
                alt="Card background"
                src={imagePath}
                width={1100}
                height={400}
                className="my-4"
              />
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={winRateTeam}
                  color="success"
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">
                    {myTeam?.ranking}위 {myTeam?.w}W {myTeam?.l}L
                  </p>
                  <p className="mx-4 font-bold">득실 {myTeam?.point}</p>
                  <p className="mx-4 font-bold">승점 {myTeam?.winpoint}</p>
                </div>
              </div>
              <div className="flex flex-col mx-auto my-4">
                <p>Next Match</p>
                <div className="p-4">
                  <Popover showArrow placement="bottom">
                    <PopoverTrigger>
                      <User
                        as="button"
                        name="Zoe Lang"
                        description="Product Designer"
                        className="transition-transform"
                        avatarProps={{
                          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-1">
                      <UserTwitterCard />
                    </PopoverContent>
                  </Popover>
                </div>
                <Tooltip showArrow={true} content="D-2">
                  <Button>2023-07-04</Button>
                </Tooltip>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"후원"} title={"후원"}>
          <Card>
            <CardHeader>
              <p className="text-lg font-bold">후원자 명단</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
              <p>김도원 100000원</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"포인트"} title={"포인트"}>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key={"최신댓글"} title={"최신댓글"}>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TapNav;
