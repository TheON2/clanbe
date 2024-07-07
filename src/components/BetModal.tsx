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
import { Checkbox, Chip, Input, Divider } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { formatDate, formatRelativeDate } from "@/utils/dateUtils";
import SubmitModal from "./SubmitModal";
import { Betting } from "../../types/types";
import { User } from "next-auth";
import { h } from "@fullcalendar/core/preact";
import { haveBetting } from "@/service/betting";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  user: User;
  bettingData?: Betting;
};

const BetModal = ({ title, isOpen, onClose, user, bettingData }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalClose,
  } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [bettingId, setBettingId] = useState("");
  const [betTitle, setBetTitle] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [homeBetRate, setHomeBetRate] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [awayBetRate, setAwayBetRate] = useState("");
  const [status, setStatus] = useState("");
  const [betMax, setBetMax] = useState("");
  const [choice, setChoice] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [isBetDisabled, setIsBetDisabled] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [warning, setWarning] = useState("");
  const formatDateBasedOnDevice = (date: Date) =>
    isMobile ? formatRelativeDate(date) : formatDate(date);

  const getChipColor = (status: string) => {
    switch (status) {
      case "경기전":
        return "primary";
      case "경기중":
        return "warning";
      case "종료":
        return "success";
      default:
        return "primary";
    }
  };

  const chipColor = getChipColor(bettingData?.status || "경기전");

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChoice(value);
  };

  useEffect(() => {
    if (isOpen) {
      if (bettingData && bettingData.createdAt) {
        setSelectedDate(bettingData.createdAt ? bettingData.createdAt : null);
        setHomeTeam(bettingData.home);
        setAwayTeam(bettingData.away);
        setHomeBetRate(bettingData.homeBetRate.toString());
        setAwayBetRate(bettingData.awayBetRate.toString());
        setBetMax(bettingData.betMax.toString());
        setStatus(bettingData.status);
        setBetTitle(bettingData.title);
        setBettingId(bettingData._id as string);
      } else {
        setSelectedDate(null);
      }
    }
  }, [isOpen, bettingData]);

  const handleClose = () => {
    setSelectedDate(null);
    setHomeTeam("");
    setAwayTeam("");
    setHomeBetRate("");
    setAwayBetRate("");
    setBetMax("");
    setBetAmount("");
    setChoice("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      setHomeTeam("");
      setAwayTeam("");
      setHomeBetRate("");
      setAwayBetRate("");
      setBetMax("");
      setBetAmount("");
      setChoice("");
    }
  }, [isOpen]);

  // betAmount의 변경을 감지하여 betMax를 넘는지 확인하는 useEffect 추가
  useEffect(() => {
    if (
      betAmount &&
      (parseInt(betAmount) > parseInt(betMax) || parseInt(betAmount) < 1)
    ) {
      setWarning(`베팅 금액은 1에서 ${betMax} 포인트 사이여야 합니다.`);
    } else {
      setWarning("");
    }
  }, [betAmount, betMax]);

  // choice와 betAmount에 따라 베팅하기 버튼의 상태를 업데이트하는 useEffect 추가
  useEffect(() => {
    if (choice && betAmount && !warning) {
      setIsBetDisabled(false);
    } else {
      setIsBetDisabled(true);
    }
  }, [choice, betAmount, warning]);

  const handleBetClick = async () => {
    const newBettingData = {
      nickname: user?.nickname || "",
      amount: parseInt(betAmount),
      choice,
      bettingId,
      status,
    };
    console.log(newBettingData);
    const { message } = await haveBetting(newBettingData);
    setModalTitle("알림");
    setModalText(message);
    onModalOpen();
    onClose();
  };

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
            <Divider />
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center">
                <Chip color={chipColor} size="sm">
                  {status}
                </Chip>
                <div className="ml-2 font-bold md:text-md text-md">
                  {betTitle}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-row items-center gap-2 mx-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-bold text-lg">{homeTeam}</span>
                      <span>x{homeBetRate}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="font-bold text-lg">VS</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="font-bold text-lg">{awayTeam}</span>
                      <span>x{awayBetRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex justify-center" style={{ width: "auto" }}>
              경기시작 : {formatDateBasedOnDevice(selectedDate || new Date())}
            </div>

            <Divider />

            <div className="flex gap-4">
              <Checkbox
                isSelected={choice === homeTeam}
                size="md"
                value={homeTeam}
                onChange={handleCheckboxChange}
              >
                {homeTeam} 승리
              </Checkbox>
              <Checkbox
                isSelected={choice === awayTeam}
                size="md"
                value={awayTeam}
                onChange={handleCheckboxChange}
              >
                {awayTeam} 승리
              </Checkbox>
            </div>
            <div className="flex gap-4 w-full justify-center">
              <p className="font-bold">보유포인트 : {user?.point} 포인트</p>
              <p className="font-bold">베팅상한 : {betMax} 포인트</p>
            </div>
            <div className="flex gap-4 w-full">
              <Input
                fullWidth
                type="number"
                min="1"
                max={betMax}
                label="배팅 금액"
                placeholder="금액을 입력하세요"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </div>
            <p className="font-bold">
              베팅성공시 : +
              {choice === homeTeam
                ? Math.floor(parseInt(betAmount) * parseFloat(homeBetRate)) -
                  parseInt(betAmount)
                : choice === awayTeam
                ? Math.floor(parseInt(betAmount) * parseFloat(awayBetRate)) -
                  parseInt(betAmount)
                : 0}
              포인트
            </p>
            {warning && (
              <div className="text-red-500 text-sm mt-2">{warning}</div>
            )}
            <Divider />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              취소
            </Button>
            <Button
              color={isBetDisabled ? "default" : "primary"}
              disabled={isBetDisabled}
              onPress={handleBetClick}
            >
              베팅하기
            </Button>
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

export default BetModal;
