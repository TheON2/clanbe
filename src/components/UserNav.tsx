import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tab,
  Tabs,
  Tooltip,
  User,
} from "@nextui-org/react";
import { NextPage } from "next";
import { UserTwitterCard } from "./UserTwitterCard";
import Image from "next/image";
import { Team } from "../../types/types";
import { tabs } from "../../public/data";
import { User as MyUser } from "next-auth";
import { signOut } from "next-auth/react";

type UserNavProps = {
  user: MyUser;
  teams: Team[];
};

const UserNav = ({ user, teams }: UserNavProps) => {
  // 총 승리, 패배 횟수 및 각 종족별 승률 계산
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
  const imagePath = teamImagePaths[user.team] || "/default.jpg";

  return (
    <Tabs aria-label="Dynamic tabs" items={tabs}>
      <Tab key={"Profile"} title={"Profile"}>
        <Card>
          <CardBody>
            <User
              className="my-4"
              name={user.nickname}
              description={user.role}
              avatarProps={{
                src: user.avatar,
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
              <p onClick={() => signOut()}>로그아웃</p>
            </div>
          </CardBody>
        </Card>
      </Tab>
      <Tab key={"BELO"} title={"BELO"}>
        <Card>
          <CardBody className="my-4">
            <User
              name={user.name}
              description={user.role}
              avatarProps={{
                src: user.avatar,
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
                <p className="mx-4 font-bold">{user.tear} Tier</p>
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
                vs P {user.BELO.pw}W {user.BELO.pl}L
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
                vs Z {user.BELO.zw}W {user.BELO.zl}L
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
                vs T {user.BELO.tw}W {user.BELO.tl}L
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
              name={user.name}
              description={user.role}
              avatarProps={{
                src: user.avatar,
              }}
            />
            <Image
              alt="Card background"
              src={imagePath}
              width={200}
              height={200}
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
  );
};

export default UserNav;