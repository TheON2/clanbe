"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { getProfile } from "@/service/user";
import { resultPointGame } from "@/service/game";

interface PointGameLottoProps {}

const PointGameLotto: React.FC<PointGameLottoProps> = (props) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<{ point: number } | null>(null);
  const [betPoints, setBetPoints] = useState<number | "">(0);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<string>("");
  const [pointResult, setPointResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasError, setHasError] = useState<string>("");

  const totalNumbers = 45;
  const numbersToSelect = 6;

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserProfile(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    validateNumbers(selectedNumbers);
  }, [selectedNumbers]);

  useEffect(() => {
    validateBetPoints();
  }, [betPoints]);

  const fetchUserProfile = async (email: string) => {
    try {
      const { user } = await getProfile(email);
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleNumberClick = (num: number) => {
    let newNumbers = [...selectedNumbers];
    if (newNumbers.includes(num)) {
      newNumbers = newNumbers.filter((n) => n !== num);
    } else if (newNumbers.length < numbersToSelect) {
      newNumbers.push(num);
    }
    setSelectedNumbers(newNumbers);
  };

  const validateNumbers = (numbers: number[]) => {
    const numberSet = new Set<number>(numbers);
    if (numbers.length !== numberSet.size) {
      setHasError("1부터 45 사이의 서로 다른 숫자를 선택하세요.");
      return false;
    }
    setHasError("");
    return true;
  };

  const validateBetPoints = () => {
    if (
      betPoints === "" ||
      betPoints < 1 ||
      betPoints > 100 ||
      betPoints > userInfo!.point
    ) {
      setHasError(
        "유효한 베팅 포인트를 입력하세요 (1-100) 및 보유 포인트 이하로 설정하세요."
      );
      return false;
    }
    setHasError("");
    return true;
  };

  const generateWinningNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < numbersToSelect) {
      const randomNum = Math.floor(Math.random() * totalNumbers) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
  };

  const generateAutoNumbers = () => {
    const autoNumbers = generateWinningNumbers();
    setSelectedNumbers(autoNumbers);
    handleBet(autoNumbers);
  };

  const handleBet = async (numbers: number[] = selectedNumbers) => {
    if (!validateBetPoints() || !validateNumbers(numbers)) {
      return;
    }

    setIsProcessing(true);
    const winningNums = generateWinningNumbers();
    setWinningNumbers(winningNums);

    const matchedNumbers = numbers.filter((num) =>
      winningNums.includes(num)
    ).length;

    let pointChange: number = 0;
    if (matchedNumbers === numbersToSelect) {
      pointChange = Number(betPoints) * 10; // 예: 6개 모두 맞추면 10배 포인트
      setPointResult(`축하합니다! ${pointChange} 포인트를 얻었습니다.`);
    } else if (matchedNumbers >= 3) {
      pointChange = Number(betPoints) * matchedNumbers; // 예: 3개 이상 맞추면 배팅 포인트의 해당 숫자 배수
      setPointResult(`축하합니다! ${pointChange} 포인트를 얻었습니다.`);
    } else {
      pointChange = -Number(betPoints);
      setPointResult(`아쉽게도 ${betPoints} 포인트를 잃었습니다.`);
    }

    await resultPointGame(session!.user!.nickname, pointChange);
    if (session?.user?.email) {
      await fetchUserProfile(session.user.email);
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setSelectedNumbers([]);
    setBetPoints(0);
    setHasError("");
    setWinningNumbers([]);
    setResult("");
    setPointResult("");
  };

  return (
    <Card className="flex flex-col justify-center items-center w-full min-h-[600px] p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">로또 게임</h1>
      <div>
        <h1 className="text-2xl font-bold">보유 포인트: {userInfo?.point}</h1>
      </div>
      {hasError && <p className="text-red-500 mb-4">{hasError}</p>}
      <div className="flex gap-2 mt-2">
        <Button onClick={handleReset} disabled={isProcessing} color="danger">
          초기화
        </Button>
        <Button
          onClick={generateAutoNumbers}
          disabled={isProcessing || hasError !== ""}
          color={isProcessing || hasError !== "" ? "default" : "primary"}
        >
          자동 구매
        </Button>
        <Button
          onClick={() => handleBet()}
          disabled={isProcessing || hasError !== ""}
          color={isProcessing || hasError !== "" ? "default" : "primary"}
        >
          {isProcessing ? "처리 중..." : "복권 구매"}
        </Button>
      </div>
      <div className="flex flex-col items-center mt-4 mb-4">
        <Input
          type="number"
          min="1"
          max="100"
          value={betPoints.toString()} // Convert betPoints to a string
          onChange={(e) => setBetPoints(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded dark:border-gray-600 font-bold text-2xl w-full text-center dark:text-white"
          placeholder="베팅할 포인트를 입력하세요 (1-100)"
          label="베팅 포인트"
        />
        {winningNumbers.length > 0 && (
          <div className="flex flex-col gap-4 mt-8 mb-4 justify-center items-center w-full">
            <h2 className="text-xl font-semibold">당첨 번호</h2>
            <div className="grid grid-cols-6 gap-2">
              {winningNumbers.map((num) => (
                <div
                  key={num}
                  className="p-2 border rounded-lg bg-green-500 text-white"
                >
                  {num}
                </div>
              ))}
            </div>
            <h3 className="font-bold md:text-2xl mt-4">{pointResult}</h3>
          </div>
        )}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {Array.from({ length: totalNumbers }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`p-2 border rounded-lg ${
                selectedNumbers.includes(num)
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
              disabled={isProcessing}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PointGameLotto;
