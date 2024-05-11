import { Card, Spinner, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink, Avatar } from "@nextui-org/react";
import { User as MyUser } from "../../types/types";
import { formatDate } from "@/utils/dateUtils";

type ProfileCardProps = {
  userData: any;
  type: number;
  index: number;
};

export default function ProleagueAvatarCard({
  userData,
  index,
  type,
}: ProfileCardProps) {
  if (!userData) {
    return <Spinner size="lg" />;
  }

  // const totalWins =
  //   userData.league.pw + userData.league.zw + userData.league.tw;
  // const totalGames =
  //   totalWins + userData.league.pl + userData.league.zl + userData.league.tl;
  // const winRate =
  //   totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : 0;

  const totalWins = userData.BELO.pw + userData.BELO.zw + userData.BELO.tw;
  const totalGames =
    totalWins + userData.BELO.pl + userData.BELO.zl + userData.BELO.tl;
  const winRate =
    totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : 0;

  const getContent = () => {
    switch (type) {
      case 0:
        return `${totalWins} 승`;
      case 1:
        return `${winRate}%`;
      case 2:
        return `${totalGames} 게임`;
      default:
        return null;
    }
  };
  return (
    <>
      <Card className="w-full">
        <div className="flex items-center justify-between w-full p-2">
          {/* 왼쪽 부분: 순위와 아바타 */}
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl">{index + 1}.</p>
            <Avatar src={userData.avatar} size="md" />
            <div>
              <p className="font-bold text-xl">{userData.nickname}</p>
              <p className="font-bold text-md">{userData.team}</p>
            </div>
          </div>
          {/* 오른쪽 부분: 내용을 표시 */}
          <div>
            <p className="font-bold text-md dark:text-blue-dark">
              {getContent()}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
