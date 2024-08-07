import React from "react";
import { Betting } from "../../types/types";
import { Chip, Divider } from "@nextui-org/react";
import { formatDate, formatRelativeDate } from "@/utils/dateUtils";
import { useMediaQuery } from "react-responsive";
import { EditIcon } from "../../public/EditIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { CheckIcon } from "../../public/check";
import { useSession } from "next-auth/react";

interface BettingCardProps {
  bettingData: Betting;
  onEdit: () => void;
  onDelete: () => void;
  onBet: () => void;
  onResult: () => void;
}

const BettingCard: React.FC<BettingCardProps> = ({
  bettingData,
  onEdit,
  onDelete,
  onBet,
  onResult
}) => {
  const { data: session, status } = useSession();
  const isMobile = useMediaQuery({ maxWidth: 767 });
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

  const chipColor = getChipColor(bettingData.status);
  return (
    <div className="flex flex-col px-4 py-2 gap-4">
      <div className="flex gap-4">
        <div>
          <Chip color={chipColor} size="sm">
            {bettingData.status}
          </Chip>
        </div>
        <div
          className="font-bold md:text-xl text-xs hover:text-blue-default cursor-pointer"
          onClick={onBet}
        >
          {bettingData.title}
        </div>
        {session && session.user && session?.user.role === "Staff" && (
          <div className="ml-auto mr-2 flex gap-4">
            <EditIcon
              className="text-blue-500 cursor-pointer"
              onClick={onEdit}
            />
            <DeleteIcon
              className="text-red-500 cursor-pointer"
              onClick={onDelete}
            />
            <CheckIcon
              className="text-green-500 cursor-pointer"
              filled={false}
              height={16}
              width={16}
              onClick={onResult}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-2 mx-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="font-bold">{bettingData.home}</span>
            <span>x{bettingData.homeBetRate}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="font-bold">{bettingData.away}</span>
            <span>x{bettingData.awayBetRate}</span>
          </div>
        </div>

        <div className="flex-none ml-auto mr-2" style={{ width: "auto" }}>
          {formatDateBasedOnDevice(bettingData.createdAt || new Date())}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default BettingCard;
