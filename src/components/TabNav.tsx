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

const TapNav = () => {
  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "music",
      label: "Music",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  return (
    <div className="w-[220px] mx-4 sticky top-16 my-32">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"Profile"} title={"Profile"}>
          <Card>
            <CardBody>
              <User
                className="my-4"
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
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
                label="LV29"
                value={65}
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
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <div className="flex my-4">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={60}
                  color="success"
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">18W 12L</p>
                  <p className="mx-2 font-bold">A+ Tier Rank 3</p>
                </div>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={70}
                  color="success"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">vs P 7W 3L</p>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={60}
                  color="success"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">vs Z 7W 3L</p>
              </div>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={40}
                  color="danger"
                  showValueLabel={true}
                />
                <p className="mx-4 font-bold">vs T 4W 6L</p>
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
            <CardBody>
              <User
                className="my-4"
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <Image
                alt="Card background"
                src={"/grtc.jpg"}
                width={1100}
                height={400}
              />
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={70}
                  color="success"
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">1위 7W 3L</p>
                  <p className="mx-4 font-bold">득실 +15</p>
                  <p className="mx-4 font-bold">승점 35</p>
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
