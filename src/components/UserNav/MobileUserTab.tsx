import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Divider,
  Image,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Tabs,
  Tab,
  User,
} from "@nextui-org/react";
import { UserTwitterCard } from "../UserTwitterCard";
import { User as MyUser } from "next-auth";
import { Team } from "../../../types/types";
import { UserSettingIcon } from "../../../public/UserSettingIcon";
import { LogoutIcon } from "../../../public/logout";
import { tabs } from "../../../public/data";
import { signOut } from "next-auth/react";

type UserTabProps = {
  user: MyUser;
  teams: Team[];
};

const MobileUserTab = ({ user, teams }: UserTabProps) => {
  const totalWins = user.BELO.pw + user.BELO.tw + user.BELO.zw;
  const totalLosses = user.BELO.pl + user.BELO.tl + user.BELO.zl;

  const totalGames = totalWins + totalLosses;
  const winRateTotal = (totalWins / totalGames) * 100;

  const winRateP = (user.BELO.pw / (user.BELO.pw + user.BELO.pl)) * 100;
  const winRateT = (user.BELO.tw / (user.BELO.tw + user.BELO.tl)) * 100;
  const winRateZ = (user.BELO.zw / (user.BELO.zw + user.BELO.zl)) * 100;

  // 레벨과 경험치 백분율 계산
  const level = Math.floor(user.point / 1000);
  const expPercentage = (user.point % 1000) / 10;

  const myTeam = teams.find((team: Team) => team.name === user.team);

  const winRateTeam = myTeam ? (myTeam.w / (myTeam.w + myTeam.l)) * 100 : 0;
  // myTeam이 undefined일 경우 승률을 0으로 설정

  // 팀 이미지 경로 매핑
  const teamImagePaths: { [key: string]: string } = {
    갈락티코: "/grtc.jpg",
    버킹엄: "/bk.jpg",
    원: "/one.jpg",
  };

  // 선택한 팀에 따른 이미지 경로 결정
  const imagePath = teamImagePaths[user.team] || "/Belogo.png";

  return (
    <>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"BELO"} title={"BELO"}>
          <Card>
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="font-bold font-mono text-3xl text-blue text-center">
                    {user.role}
                  </p>
                </div>
                <div>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    startContent={
                      <UserSettingIcon filled={"none"} height={24} width={24} />
                    }
                  ></Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    startContent={
                      <LogoutIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => signOut()}
                  ></Button>
                </div>
              </div>
              <Divider />
              <div className="mt-4 mb-6">
                <div className="flex items-center justify-center m-2 gap-4">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar src={user.avatar} className="w-20 h-20 text-large" />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{user.nickname}</p>
                    <p className="font-bold text-md text-blue">@{user.name}</p>
                  </div>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "max-w-lg",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                  label={"LV" + level}
                  value={expPercentage}
                  showValueLabel={true}
                />
              </div>
              <div className="flex justify-center">
                <div className="flex my-4 w-[200px]">
                  <CircularProgress
                    aria-label="Loading..."
                    classNames={{
                      svg: "w-20 h-20",
                    }}
                    value={winRateTotal}
                    color={winRateTotal >= 50 ? "success" : "danger"}
                    showValueLabel={true}
                  />
                  <div className="flex flex-wrap items-center content-center">
                    <p className="mx-2 font-bold text-xl">
                      {totalWins}W {totalLosses}L
                    </p>
                    <p className="mx-2 font-bold text-2xl">{user.tear} Tier</p>
                  </div>
                </div>
                <div className="flex flex-col ml-4">
                  <div className="flex my-2">
                    <CircularProgress
                      aria-label="Loading..."
                      size="lg"
                      value={winRateP}
                      color={winRateP >= 50 ? "success" : "danger"}
                      showValueLabel={true}
                    />
                    <p className="mx-4 font-bold">
                      vs P <br /> {user.BELO.pw}W {user.BELO.pl}L
                    </p>
                  </div>
                  <div className="flex my-2">
                    <CircularProgress
                      aria-label="Loading..."
                      size="lg"
                      value={winRateZ}
                      color={winRateZ >= 50 ? "success" : "danger"}
                      showValueLabel={true}
                    />
                    <p className="mx-4 font-bold">
                      vs Z <br /> {user.BELO.zw}W {user.BELO.zl}L
                    </p>
                  </div>
                  <div className="flex my-2">
                    <CircularProgress
                      aria-label="Loading..."
                      size="lg"
                      value={winRateT}
                      color={winRateT >= 50 ? "success" : "danger"}
                      showValueLabel={true}
                    />
                    <p className="mx-4 font-bold">
                      vs T <br /> {user.BELO.tw}W {user.BELO.tl}L
                    </p>
                  </div>
                </div>
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
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="font-bold font-mono text-3xl text-blue text-center">
                    {user.role}
                  </p>
                </div>
                <div>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    startContent={
                      <UserSettingIcon filled={"none"} height={24} width={24} />
                    }
                  ></Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    startContent={
                      <LogoutIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => signOut()}
                  ></Button>
                </div>
              </div>
              <Divider />
              <div className="mt-4 mb-6">
                <div className="flex items-center justify-center m-2 gap-4">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar src={user.avatar} className="w-20 h-20 text-large" />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{user.nickname}</p>
                    <p className="font-bold text-md text-blue">@{user.name}</p>
                  </div>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "max-w-lg",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                  label={"LV" + level}
                  value={expPercentage}
                  showValueLabel={true}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center w-full">
                  <Image
                    alt="Card background"
                    src={imagePath}
                    width={300}
                    height={300}
                    className="my-4"
                  />
                </div>
                <div className="flex items-center justify-center my-2">
                  <CircularProgress
                    aria-label="Loading..."
                    classNames={{
                      svg: "w-20 h-20",
                    }}
                    value={winRateTeam}
                    color={winRateTeam >= 50 ? "success" : "danger"}
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
                          name="갈락티코"
                          description="1위 3승 1패"
                          className="transition-transform"
                          avatarProps={{
                            src: "/grtc.jpg",
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
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

export default MobileUserTab;
