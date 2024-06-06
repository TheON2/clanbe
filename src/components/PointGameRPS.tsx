"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@nextui-org/react";

interface PointGameRPSProps {}

const PointGameRPS: React.FC<PointGameRPSProps> = (props) => {
  const choices = ["가위", "바위", "보"];

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

  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [showChoices, setShowChoices] = useState(false);

  const handleChoice = (choice: string) => {
    setPlayerChoice(choice);
    setShowChoices(true);

    let intervalId = setInterval(() => {
      const randomChoice = getRandomChoice();
      setComputerChoice(randomChoice);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      const finalChoice = getRandomChoice();
      setComputerChoice(finalChoice);
      const winner = determineWinner(choice, finalChoice);
      setResult(winner);
      setShowChoices(false);
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

  return (
    <Card className="flex flex-col justify-center items-center w-full min-h-[500px] p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold">가위바위보 게임</h1>
      <div className="flex gap-4 mt-8 h-[100px] justify-center items-center ">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className="flex flex-col items-center p-4 border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        </div>
      )}
    </Card>
  );
};

export default PointGameRPS;
