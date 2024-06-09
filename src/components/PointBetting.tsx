"use client";

import React, { useEffect, useState } from "react";
import { Betting } from "../../types/types";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import BettingModal from "./BettingModal";
import BettingCard from "./BettingCard";
import BetModal from "./BetModal";

interface PointBettingProps {
  bettings: Betting[];
  users: User[];
}

//Betting에 맞는 더미데이터 10개 생성
const dummyBettings: Betting[] = Array.from({ length: 10 }, (_, i) => ({
  _id: i.toString(),
  title: `S티어 Hope(P) VS Song(P) 1경기 아포칼립스 ${i}`,
  home: `home${i}`,
  homeBetRate: 1.5,
  away: `away${i}`,
  awayBetRate: 2.5,
  betMax: 10000,
  status: ["경기전", "경기중", "종료"][Math.floor(Math.random() * 3)],
  bets: Array.from({ length: 5 }, (_, j) => ({
    nickname: `LAUFE`,
    amount: 1000,
    choice: `home${i}`,
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
  const [isBet, setIsBet] = useState(false);

  useEffect(() => {
    if (!isCreate || !isBet) {
      setEditBettingData(undefined);
    }
  }, [isCreate, isBet]);

  const handleDelete = (bettingId: string) => {
    // 실제 삭제 로직을 여기에 구현하십시오.
    console.log(`Deleting betting with id ${bettingId}`);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <BettingModal
        title={"베팅정보 등록/수정"}
        isOpen={isCreate}
        onClose={() => setIsCreate(false)}
        users={users}
        bettingData={editBettingData}
      />
      <BetModal
        title={"베팅하기"}
        isOpen={isBet}
        onClose={() => setIsBet(false)}
        user={userInfo}
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
              <div key={idx}>
                <BettingCard
                  key={betting._id}
                  bettingData={betting}
                  onEdit={() => {
                    setEditBettingData(betting);
                    setIsCreate(true);
                  }}
                  onBet={() => {
                    setEditBettingData(betting);
                    setIsBet(true);
                  }}
                  onDelete={() => handleDelete(betting._id as string)}
                />
              </div>
            ))}
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};

export default PointBetting;
