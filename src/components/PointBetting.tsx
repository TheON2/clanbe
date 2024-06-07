"use client";

import React, { useEffect, useState } from "react";
import { Betting } from "../../types/types";
import { Button, Card, CardBody, CardHeader, user } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { getProfile } from "@/service/user";
import { User } from "next-auth";
import BettingModal from "./BettingModal";
import BettingCard from "./BettingCard";

interface PointBettingProps {
  bettings: Betting[];
  users: User[];
}

//Betting에 맞는 더미데이터 10개 생성
const dummyBettings: Betting[] = Array.from({ length: 10 }, (_, i) => ({
  _id: i.toString(),
  title: `베팅 ${i}`,
  home: `home${i}`,
  homeBetRate: 1.5,
  away: `away${i}`,
  awayBetRate: 2.5,
  betMax: 10000,
  status: "경기전",
  bets: Array.from({ length: 5 }, (_, j) => ({
    nickname: `user${j}`,
    amount: 1000,
    choice: "home",
  })),
  createdAt: new Date(),
}));

const PointBetting: React.FC<PointBettingProps> = ({ bettings, users }) => {
  const { data: session } = useSession();
  const userInfo = users.filter(
    (user) => user.email === session?.user?.email
  )[0];
  const [editBettingData, setEditBettingData] = useState<Betting | undefined>(
    undefined
  );
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (!isCreate) {
      setEditBettingData(undefined);
    }
  }, [isCreate]);

  return (
    <div className="w-full mx-auto">
      <BettingModal
        title={"베팅정보 등록/수정"}
        isOpen={isCreate}
        onClose={() => setIsCreate(false)}
        users={users}
        bettingData={editBettingData}
      />
      <p className="text-2xl font-bold mb-2">포인트 베팅</p>
      <Card className="min-h-[800px] w-full flex gap-2 items-center">
        <CardHeader className="text-center flex gap-4 m-2 items-end">
          <Card className="w-[200px] p-4">
            <p className="text-2xl font-bold">보유 포인트</p>
            <p className="text-2xl font-bold">{userInfo?.point}P</p>
          </Card>
          <Button color="primary" size="lg" onPress={() => setIsCreate(true)}>
            베팅 등록
          </Button>
        </CardHeader>
        <CardBody>
          <Card className="w-full min-h-[600px]">
            {dummyBettings.map((betting, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setEditBettingData(betting);
                  setIsCreate(true);
                }}
              >
                <BettingCard key={betting._id} bettingData={betting} />
              </div>
            ))}
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};

export default PointBetting;
