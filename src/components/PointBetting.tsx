"use client";

import React, { useEffect, useState } from "react";
import { Betting } from "../../types/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import BettingModal from "./BettingModal";
import BettingCard from "./BettingCard";
import BetModal from "./BetModal";
import { useRouter } from "next/navigation";
import { deleteBetting, resultBetting } from "@/service/betting";
import SubmitModal from "./SubmitModal";
import ConfirmModal from "./ConfirmModal";

interface PointBettingProps {
  bettings: Betting[];
  users: User[];
}

const PointBetting: React.FC<PointBettingProps> = ({ bettings, users }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onOpenChange: onConfirmModalClose,
  } = useDisclosure();
  const {
    isOpen: isResultModalOpen,
    onOpen: onResultModalOpen,
    onOpenChange: onResultModalClose,
  } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const userInfo = users.filter(
    (user) => user.email === session?.user?.email
  )[0];
  const [editBettingData, setEditBettingData] = useState<Betting | undefined>(
    undefined
  );
  const [isCreate, setIsCreate] = useState(false);
  const [isBet, setIsBet] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => Promise<void>>(
    () => Promise.resolve
  );

  useEffect(() => {
    if (!isCreate && !isBet) {
      setEditBettingData(undefined);
    }
  }, [isCreate, isBet]);

  const handleDelete = (bettingId: string) => {
    setConfirmTitle("베팅 삭제하기");
    setConfirmText("베팅을 삭제하시겠습니까?");
    onConfirmModalOpen();

    setConfirmAction(() => async () => {
      const { message } = await deleteBetting(bettingId);
      setModalTitle("베팅 삭제하기");
      setModalText(message);
      onResultModalOpen();
    });
  };

  const handleResult = (bettingId: string) => {
    setConfirmTitle("베팅 정산하기");
    setConfirmText("베팅을 종료하고 정산하시겠습니까?");
    onConfirmModalOpen();

    setConfirmAction(() => async () => {
      //const { message } = await resultBetting(bettingId);
      // 여기에 베팅 정산 API 호출 코드 추가
      setModalTitle("베팅 정산하기");
      setModalText("베팅종료 및 정산이 완료되었습니다.");
      onResultModalOpen();
    });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <ConfirmModal
        confirmtext={confirmText}
        confirmtitle={confirmTitle}
        isOpen={isConfirmModalOpen}
        onClose={onConfirmModalClose}
        onSubmit={confirmAction}
      />
      <SubmitModal
        title={modalTitle}
        text={modalText}
        isOpen={isResultModalOpen}
        onClose={onResultModalClose}
      />
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
          {userInfo?.role === "Staff" && (
            <Button color="primary" size="lg" onPress={() => setIsCreate(true)}>
              베팅 등록
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Card className="w-full min-h-[600px]">
            {bettings.map((betting, idx) => (
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
                  onResult={() => handleResult(betting._id as string)}
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
