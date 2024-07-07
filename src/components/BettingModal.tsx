import React, { useState, useEffect, ChangeEvent } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Calendar, Divider } from "@nextui-org/react";
import { parseDate, DateValue } from "@internationalized/date";
import { Betting } from "../../types/types";
import { User } from "next-auth";
import SubmitModal from "./SubmitModal";
import { createBetting } from "@/service/betting";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  bettingData?: Betting;
};

const BettingModal = ({ title, isOpen, onClose, bettingData }: Props) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalClose,
  } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [betTitle, setBetTitle] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [homeBetRate, setHomeBetRate] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [awayBetRate, setAwayBetRate] = useState("");
  const [status, setStatus] = useState("");
  const [betMax, setBetMax] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (bettingData && bettingData.createdAt) {
        const createdAtDate = new Date(bettingData.createdAt); // Date 객체로 변환
        setSelectedDate(parseDate(createdAtDate.toISOString().split("T")[0]));
        setHomeTeam(bettingData.home);
        setAwayTeam(bettingData.away);
        setHomeBetRate(bettingData.homeBetRate.toString());
        setAwayBetRate(bettingData.awayBetRate.toString());
        setBetMax(bettingData.betMax.toString());
        setStatus(bettingData.status);
        setBetTitle(bettingData.title);
      } else {
        setSelectedDate(parseDate(new Date().toISOString().split("T")[0]));
      }
    }
  }, [isOpen, bettingData]);

  const handleHomePlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHomeTeam(e.target.value);
  };

  const handleAwayPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAwayTeam(e.target.value);
  };

  const handleHomeBetRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHomeBetRate(e.target.value);
  };

  const handleAwayBetRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAwayBetRate(e.target.value);
  };

  const handleBetMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBetMax(e.target.value);
  };

  const handleClose = () => {
    setSelectedDate(null);
    setHomeTeam("");
    setAwayTeam("");
    setHomeBetRate("");
    setAwayBetRate("");
    setBetMax("");
    setStatus("");
    setBetTitle("");
    onClose();
  };

  const handleCreate = async () => {
    const newBettingData = {
      title: betTitle,
      home: homeTeam,
      homeBetRate: parseFloat(homeBetRate),
      away: awayTeam,
      awayBetRate: parseFloat(awayBetRate),
      betMax: parseInt(betMax),
      status: status,
      bets: [],
      createdAt: new Date(selectedDate?.toString() as string),
    };
    try {
      const { message } = await createBetting(newBettingData);
      setModalTitle("알림");
      setModalText(message);
      onModalOpen();
      handleClose();
    } catch (e) {
      console.error(e);
      setModalTitle("에러");
      setModalText("베팅정보 등록에 실패했습니다.");
      onModalOpen();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      setHomeTeam("");
      setAwayTeam("");
      setHomeBetRate("");
      setAwayBetRate("");
      setBetMax("");
      setStatus("");
      setBetTitle("");
    }
  }, [isOpen]);

  return (
    <div className="">
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onClose}
        onClose={onClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="max-h-[80vh] overflow-y-auto">
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody className="max-h-[70vh] overflow-y-auto flex items-center">
            <div className="mb-4">
              {selectedDate && (
                <Calendar
                  aria-label="Date (Controlled)"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              )}
            </div>
            <Divider />
            <div className="flex flex-col gap-4 w-full">
              <Select
                className="md:w-1/2"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                selectedKeys={[status]}
              >
                <SelectItem value="경기전" key={"경기전"}>
                  경기전
                </SelectItem>
                <SelectItem value="경기중" key={"경기중"}>
                  경기중
                </SelectItem>
                <SelectItem value="종료" key={"종료"}>
                  종료
                </SelectItem>
              </Select>
              <Input
                label="Title"
                placeholder="Enter Title"
                value={betTitle}
                onChange={(e) => setBetTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full">
              <Input
                label="Home Player"
                placeholder="Enter Home Player"
                value={homeTeam}
                onChange={handleHomePlayerChange}
              />
              <Input
                label="Away Player"
                placeholder="Enter Away Player"
                value={awayTeam}
                onChange={handleAwayPlayerChange}
              />
            </div>
            <Divider />
            <div className="flex gap-4 w-full">
              <Input
                label="Home Bet Rate"
                type="number"
                step="0.01"
                placeholder="Enter Home Bet Rate"
                value={homeBetRate}
                onChange={handleHomeBetRateChange}
              />
              <Input
                label="Away Bet Rate"
                type="number"
                step="0.01"
                placeholder="Enter Away Bet Rate"
                value={awayBetRate}
                onChange={handleAwayBetRateChange}
              />
            </div>
            <Divider />
            <div className="flex gap-4 w-full">
              <Input
                label="Max Bet"
                type="number"
                placeholder="Enter Max Bet"
                value={betMax}
                onChange={handleBetMaxChange}
              />
            </div>
            <Divider />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              취소
            </Button>
            {bettingData ? (
              <>
                <Button color="primary">수정</Button>
              </>
            ) : (
              <>
                <Button color="primary" onPress={() => handleCreate()}>
                  저장
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SubmitModal
        title={modalTitle}
        text={modalText}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
};

export default BettingModal;
