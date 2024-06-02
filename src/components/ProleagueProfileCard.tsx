import { Card, Spinner, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink, Avatar } from "@nextui-org/react";
import { User as MyUser } from "../../types/types";
import { formatDate } from "@/utils/dateUtils";

type ProfileCardProps = {
  userData: any;
  index: number;
  teamData: any;
};

export default function ProleagueProfileCard({
  userData,
  index,
  teamData,
}: ProfileCardProps) {
  if (!userData) {
    return <Spinner size="lg" />;
  }

  const totalWins =
    userData.league.pw + userData.league.zw + userData.league.tw;
  const totalGames =
    totalWins + userData.league.pl + userData.league.zl + userData.league.tl;
  const winRate =
    totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : 0;
  const myTeam = teamData.filter((team: any) => team._id === userData.team);

  const getContent = () => {
    switch (index) {
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
        <div className="flex p-4">
          {/* Avatar 위치를 조정합니다. */}
          <Avatar src={userData.avatar} className="w-24 h-24 text-large" />
          <div className="flex flex-col items-center justify-center ml-4">
            <p className="font-bold text-xl ">{myTeam[0]?.name}</p>
            <p className="font-bold text-4xl">{userData.nickname}</p>
            <p className="font-bold text-2xl dark:text-blue-dark">
              {getContent()}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
