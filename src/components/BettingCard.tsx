import React from "react";
import { Betting } from "../../types/types";
import { Divider } from "@nextui-org/react";

interface BettingCardProps {
  bettingData: Betting;
}

const BettingCard: React.FC<BettingCardProps> = ({ bettingData }) => {
  // Implement the logic for the BettingCard component here

  return (
    <div className="flex flex-col px-4 py-2 gap-4">
      <div className="flex gap-4">
        <div className="font-bold md:text-xl text-sm hover:text-blue-default cursor-pointer">
          {bettingData.title}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mx-4">
        <div className="flex items-center gap-4"></div>
        <div className="flex-none ml-auto mr-2" style={{ width: "auto" }}>
          조회 수
        </div>
        <div className="flex-none" style={{ width: "auto" }}>
          {bettingData.createdAt?.getTime()}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default BettingCard;
