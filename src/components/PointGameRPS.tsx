"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { getProfile } from "@/service/user";
import { resultPointGame } from "@/service/game";
import { useRouter } from "next/navigation";

interface PointGameRPSProps {}

const PointGameRPS: React.FC<PointGameRPSProps> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  if (!isLoggedIn) {
    router.push("/auth/signin");
  }
  const choices = ["가위", "바위", "보"];
  const [userInfo, setUserInfo] = useState<{ point: number } | null>(null);
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const [betPoints, setBetPoints] = useState<number | "">(0);
  const [pointResult, setPointResult] = useState<string>("");

  const getRandomChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (playerChoice: string, computerChoice: string) => {
    if (playerChoice === computerChoice) {
      return "무승부";
    }
    if (
      (playerChoice === "바위" && computerChoice === "가위") ||
      (playerChoice === "가위" && computerChoice === "보") ||
      (playerChoice === "보" && computerChoice === "바위")
    ) {
      return "플레이어 승리";
    }
    return "컴퓨터 승리";
  };

  const handleChoice = async (choice: string) => {
    if (
      betPoints === "" ||
      betPoints < 1 ||
      betPoints > 100 ||
      betPoints > userInfo!.point
    ) {
      alert("유효한 베팅 포인트를 입력하세요.");
      return;
    }

    setPlayerChoice(choice);
    setShowChoices(true);

    let intervalId = setInterval(() => {
      const randomChoice = getRandomChoice();
      setComputerChoice(randomChoice);
    }, 100);

    setTimeout(async () => {
      clearInterval(intervalId);
      const finalChoice = getRandomChoice();
      setComputerChoice(finalChoice);
      const winner = determineWinner(choice, finalChoice);
      setResult(winner);
      setShowChoices(false);

      let pointChange = 0;
      if (winner === "플레이어 승리") {
        pointChange = betPoints;
        setPointResult(`축하합니다! ${betPoints} 포인트를 얻었습니다.`);
      } else if (winner === "컴퓨터 승리") {
        pointChange = -betPoints;
        setPointResult(`아쉽게도 ${betPoints} 포인트를 잃었습니다.`);
      } else {
        setPointResult("무승부입니다. 포인트 변동이 없습니다.");
      }

      await resultPointGame(session!.user!.nickname, pointChange);
      if (session?.user?.email) {
        await fetchUserProfile(session.user.email);
      }
    }, 3000);
  };

  const getImageSrc = (choice: string) => {
    switch (choice) {
      case "가위":
        return "/scissor.png";
      case "바위":
        return "/rock.png";
      case "보":
        return "/paper.png";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserProfile(session.user.email);
    }
  }, [session]);

  const fetchUserProfile = async (email: string) => {
    try {
      const { user } = await getProfile(email);
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  return (
    <Card className="flex flex-col justify-center items-center w-full min-h-[500px] p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">가위바위보 게임</h1>
      <div>
        <h1 className="text-2xl font-bold">보유 포인트: {userInfo?.point}</h1>
      </div>

      <div className="flex flex-col items-center mt-4">
        <Input
          type="number"
          min="1"
          max="100"
          value={betPoints.toString()} // Convert betPoints to a string
          onChange={(e) => setBetPoints(Number(e.target.value))}
          className="mb-8 p-2 border border-gray-300 rounded dark:border-gray-600 font-bold text-2xl w-full text-center dark:text-white"
          placeholder="베팅할 포인트를 입력하세요 (1-100)"
          label="베팅 포인트"
        />
        <div className="flex gap-4 h-[100px] justify-center items-center">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className="flex flex-col items-center p-4 border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={
                showChoices ||
                betPoints === "" ||
                betPoints < 1 ||
                betPoints > 100 ||
                betPoints > userInfo!.point
              }
            >
              <div className="w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={getImageSrc(choice)}
                  alt={choice}
                  layout="responsive"
                  width={100}
                  height={100}
                  style={{ marginBottom: "10px" }}
                  className="dark:filter dark:invert"
                />
              </div>
              <span className="mt-2 text-lg">{choice}</span>
            </button>
          ))}
        </div>
      </div>
      {playerChoice && (
        <div className="flex flex-col gap-4 mt-8 justify-center items-center w-full">
          <h2 className="text-xl font-semibold">결과</h2>
          <div className="flex gap-4 w-full justify-center items-center">
            <div className="flex flex-col items-center">
              <p className="mb-2">플레이어 선택</p>
              <div className="w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={getImageSrc(playerChoice)}
                  alt={playerChoice}
                  layout="responsive"
                  width={100}
                  height={100}
                  className="dark:filter dark:invert"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-2">컴퓨터 선택</p>
              <div className="w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={getImageSrc(computerChoice)}
                  alt={computerChoice}
                  layout="responsive"
                  width={100}
                  height={100}
                  className="dark:filter dark:invert"
                />
              </div>
            </div>
          </div>
          <h3 className="font-bold text-2xl mt-4">{result}</h3>
          <h3 className="font-bold md:text-xl text-md mt-4">{pointResult}</h3>
        </div>
      )}
    </Card>
  );
};

export default PointGameRPS;
