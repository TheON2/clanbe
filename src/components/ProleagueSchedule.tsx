"use client";

import { useCallback, useMemo, useState } from "react";
import { User } from "next-auth";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CircularProgress,
  Divider,
  Switch,
  Button,
  User as UiUser,
  Chip,
  Tooltip,
  ChipProps,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../types/types";
import ProfileCard from "./ProfileCard";
import ProleagueProfileCard from "./ProleagueProfileCard";
import ProleagueAvatarCard from "./ProleagueAvatarCard";

import { EditIcon } from "../../public/EditIcon";
import { EyeIcon } from "../../public/EyeIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { updateUserTeam } from "@/service/team";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProleagueCreateModal from "./ProleagueCreateModal";

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  [key: string]: string | number; // 인덱스 시그니처 추가
}

interface Column {
  name: string;
  uid: string;
  sortable: boolean;
  align?: "center" | "start" | "end";
  width?: number;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const tierColorMap: Record<string, string> = {
  "S+": "bg-green-100",
  S: "bg-green-200",
  "A+": "bg-blue-100",
  A: "bg-blue-200",
  "B+": "bg-yellow-100",
  B: "bg-yellow-200",
  C: "bg-red-100",
  D: "bg-red-200",
};

const dummy = [
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
];

export const ProleagueSchedule = ({ teams, users }: any) => {
  type User = (typeof users)[0];
  // 모달 상태 추가
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const userGrade = user?.grade ?? 0;

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "nickname":
        return <div>{cellValue}</div>;
      case "tier":
        return <p className="text-black">{cellValue}</p>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => router.push(`/user/profile/${user.email}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(user.nickname)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns: Column[] = [
    { name: "티어", uid: "tier", sortable: true, align: "start", width: 30 },
    {
      name: "닉네임",
      uid: "nickname",
      sortable: true,
      align: "center",
      width: 30,
    },
    { name: "종족", uid: "race", sortable: true, align: "start", width: 30 },
    { name: "승", uid: "wins", sortable: true, align: "center", width: 30 },
    { name: "패", uid: "losses", sortable: true, align: "center", width: 30 },
  ];

  if (userGrade >= 4) {
    columns.push({
      name: "Actions",
      uid: "actions",
      sortable: true,
      align: "center",
      width: 30,
    });
  }

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // 선택한 팀 객체를 찾습니다.
  const selectedTeam = useMemo(
    () => teams.find((team: Team) => team.name === selectedTeamName),
    [selectedTeamName, teams]
  );

  const rowsPerPage = 10;

  const races = ["ALL", "Z", "T", "P"];
  const tiers = ["ALL", "S+", "S", "A+", "A", "B+", "B", "C", "D"];

  const raceMapping: { [key: string]: string } = useMemo(
    () => ({
      z: "Z",
      t: "T",
      p: "P",
    }),
    []
  ); // Dependencies array is empty, it only initializes once

  const { topWins, topWinRate, topTotalGames } = useMemo(() => {
    // 다승 계산
    const topWins = [...users]
      .sort((a, b) => {
        const totalWinsA = a.BELO.pw + a.BELO.tw + a.BELO.zw;
        const totalWinsB = b.BELO.pw + b.BELO.tw + b.BELO.zw;
        return totalWinsB - totalWinsA; // 내림차순 정렬
      })
      .slice(0, 5);

    // 승률 계산
    const topWinRate = [...users]
      .sort((a, b) => {
        const totalWinsA = a.BELO.pw + a.BELO.tw + a.BELO.zw;
        const totalGamesA = totalWinsA + a.BELO.pl + a.BELO.tl + a.BELO.zl;
        const totalWinsB = b.BELO.pw + b.BELO.tw + b.BELO.zw;
        const totalGamesB = totalWinsB + b.BELO.pl + b.BELO.tl + b.BELO.zl;
        const winRateA = totalGamesA > 0 ? totalWinsA / totalGamesA : 0;
        const winRateB = totalGamesB > 0 ? totalWinsB / totalGamesB : 0;
        return winRateB - winRateA; // 내림차순 정렬
      })
      .slice(0, 5);

    // 전체 경기 수 계산
    const topTotalGames = [...users]
      .sort((a, b) => {
        const totalGamesA =
          a.BELO.pw + a.BELO.pl + a.BELO.tw + a.BELO.tl + a.BELO.zw + a.BELO.zl;
        const totalGamesB =
          b.BELO.pw + b.BELO.pl + b.BELO.tw + b.BELO.tl + b.BELO.zw + b.BELO.zl;
        return totalGamesB - totalGamesA; // 내림차순 정렬
      })
      .slice(0, 5);

    return { topWins, topWinRate, topTotalGames };
  }, [users]);

  const filteredData: UserItem[] = useMemo(() => {
    const data = users
      .filter((user: User) => {
        const matchesSearch = user.nickname
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesTier =
          selectedTier === "ALL" ||
          selectedTier === "" ||
          user.tear === selectedTier;
        const userTeam = teams.filter((team: any) => team._id === user.team);
        const matchesTeam =
          selectedTeamName === "ALL" ||
          selectedTeamName === "" ||
          userTeam[0]?.name === selectedTeamName;
        const userRace =
          raceMapping[user.BELO.race.toLowerCase()] || user.BELO.race;
        const matchesRace =
          selectedRace === "ALL" ||
          selectedRace === "" ||
          userRace === selectedRace;

        return matchesSearch && matchesRace && matchesTier && matchesTeam;
      })
      .map((user: User) => ({
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
        tier: user.tear,
        race: raceMapping[user.league.race.toLowerCase()] || user.league.race,
        wins: user.league.tw + user.league.pw + user.league.zw,
        losses: user.league.tl + user.league.pl + user.league.zl,
        belo: user.BELO.belo,
      }));
    return data.sort((a: any, b: any) => b.belo - a.belo);
  }, [
    search,
    selectedRace,
    selectedTier,
    selectedTeamName,
    users,
    raceMapping,
    teams,
  ]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  const handleDelete = async (userId: string) => {
    try {
      const response = await updateUserTeam(userId, "");
      if (response) {
        setModalMessage("성공적으로 팀에서 제외 했습니다.");
      } else {
        setModalMessage("유저 삭제에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 삭제 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  const columnRank = [
    { name: "순위", uid: "ranking" },
    { name: "Team", uid: "name" },
    { name: "W", uid: "w" },
    { name: "L", uid: "l" },
    { name: "득실", uid: "point" },
    { name: "승점", uid: "winpoint" },
  ];

  const sortedTeams = useMemo(
    () =>
      [...teams].sort((a, b) => {
        if (a.winpoint !== b.winpoint) return b.winpoint - a.winpoint;
        if (a.w !== b.w) return b.w - a.w;
        if (a.point !== b.point) return b.point - a.point;
        return 0;
      }),
    [teams]
  );

  // 선택한 팀의 승률을 계산합니다.
  const winRate = useMemo(() => {
    if (sortedTeams[0]) {
      return (sortedTeams[0].w / (sortedTeams[0].w + sortedTeams[0].l)) * 100;
    }
    return 0; // 선택된 팀이 없다면 0을 반환합니다.
  }, [sortedTeams]);

  // Top team users
  const topTeamUsers = useMemo(() => {
    if (!sortedTeams[0]) return [];
    return users.filter((user: any) => user.team === sortedTeams[0]._id);
  }, [users, sortedTeams]);

  const topTeamStats = useMemo(() => {
    const topWins = [...topTeamUsers]
      .sort((a, b) => {
        const totalWinsA = a.BELO.pw + a.BELO.tw + a.BELO.zw;
        const totalWinsB = b.BELO.pw + b.BELO.tw + b.BELO.zw;
        return totalWinsB - totalWinsA; // 내림차순 정렬
      })
      .slice(0, 5);

    const topWinRate = [...topTeamUsers]
      .sort((a, b) => {
        const totalWinsA = a.BELO.pw + a.BELO.tw + a.BELO.zw;
        const totalGamesA = totalWinsA + a.BELO.pl + a.BELO.tl + a.BELO.zl;
        const totalWinsB = b.BELO.pw + b.BELO.tw + b.BELO.zw;
        const totalGamesB = totalWinsB + b.BELO.pl + b.BELO.tl + b.BELO.zl;
        const winRateA = totalGamesA > 0 ? totalWinsA / totalGamesA : 0;
        const winRateB = totalGamesB > 0 ? totalWinsB / totalGamesB : 0;
        return winRateB - winRateA; // 내림차순 정렬
      })
      .slice(0, 5);

    const topTotalGames = [...topTeamUsers]
      .sort((a, b) => {
        const totalGamesA =
          a.BELO.pw + a.BELO.pl + a.BELO.tw + a.BELO.tl + a.BELO.zw + a.BELO.zl;
        const totalGamesB =
          b.BELO.pw + b.BELO.pl + b.BELO.tw + b.BELO.tl + b.BELO.zw + b.BELO.zl;
        return totalGamesB - totalGamesA; // 내림차순 정렬
      })
      .slice(0, 5);

    return { topWins, topWinRate, topTotalGames };
  }, [topTeamUsers]);

  return (
    <div className="w-full">
      <Button onClick={() => setIsCreate(true)}></Button>
      <ProleagueCreateModal
        title="프로리그 일정등록"
        isOpen={isCreate}
        onClose={() => setIsCreate(false)}
        teams={teams}
        users={users}
      />
      <SubmitModal
        title={"알림"}
        text={modalMessage}
        isOpen={isSubmit}
        onClose={() => setIsSubmit(false)}
      />
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">프로리그 순위</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap my-2 justify-center items-center mx-auto gap-4">
            <Card key={sortedTeams[0]?._id} className="w-[220px] h-full">
              <CardBody>
                <p className="font-bold text-2xl text-center">1위</p>
                <Image
                  src={sortedTeams[0]?.avatar}
                  height={200}
                  width={200}
                  alt="team"
                />
              </CardBody>
              <CardFooter>
                <div className="flex justify-center items-center w-full">
                  <p className="font-bold text-2xl">{sortedTeams[0]?.name}</p>
                </div>
              </CardFooter>
            </Card>
            <div>
              <div className="flex flex-col gap-2 mt-4 justify-center items-center">
                <p className="mx-4 font-bold text-2xl">
                  팀장 : {sortedTeams[0]?.leader}
                </p>
                <p className="mx-4 font-bold text-2xl">
                  팀장 : {sortedTeams[0]?.subleader}
                </p>
              </div>
              <div className="flex m-4 justify-center items-center">
                <CircularProgress
                  aria-label="Loading..."
                  classNames={{
                    svg: "w-24 h-24",
                  }}
                  value={winRate}
                  color={winRate >= 50 ? "success" : "danger"}
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">
                    {sortedTeams[0]?.ranking}위 {sortedTeams[0]?.w}W{" "}
                    {sortedTeams[0]?.l}L
                  </p>
                  <p className="mx-4 font-bold">득실 {sortedTeams[0]?.point}</p>
                  <p className="mx-4 font-bold">
                    승점 {sortedTeams[0]?.winpoint}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mx-4 font-bold">팀내 최고승률</p>
              {topTeamStats.topWinRate[0] && (
                <ProleagueAvatarCard
                  userData={topTeamStats.topWinRate[0]}
                  type={1}
                  teamData={teams}
                />
              )}
              <p className="mx-4 font-bold">팀내 최다승리</p>
              {topTeamStats.topWins[0] && (
                <ProleagueAvatarCard
                  userData={topTeamStats.topWins[0]}
                  type={0}
                  teamData={teams}
                />
              )}
              <p className="mx-4 font-bold">팀내 최다출전</p>
              {topTeamStats.topTotalGames[0] && (
                <ProleagueAvatarCard
                  userData={topTeamStats.topTotalGames[0]}
                  type={2}
                  teamData={teams}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Table aria-label="Team Rankings">
              <TableHeader columns={columnRank}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={sortedTeams}>
                {(item) => (
                  <TableRow key={item._id}>
                    <TableCell>{sortedTeams.indexOf(item) + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.w}</TableCell>
                    <TableCell>{item.l}</TableCell>
                    <TableCell>{item.point}</TableCell>
                    <TableCell>{item.winpoint}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
      {/* 프로리그 순위카드 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">프로리그 선수 랭킹</p>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 justify-center flex-wrap">
            {["다승", "승률", "전체 경기"].map((category, index: number) => (
              <div key={index}>
                <Card key={index} className="w-[300px] h-full">
                  <p
                    className={`mt-4 font-bold text-2xl dark:text-blue-dark text-center`}
                  >
                    {category}
                  </p>
                  <CardBody>
                    <div>
                      {/* 첫 번째 선수를 헤더로 표시 */}
                      <ProleagueProfileCard
                        userData={
                          index === 0
                            ? topWins[0]
                            : index === 1
                            ? topWinRate[0]
                            : topTotalGames[0]
                        }
                        index={index}
                        teamData={teams}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-2">
                      {/* 2, 3, 4, 5위 선수를 바디로 표시 */}
                      {index === 0 &&
                        topWins
                          .slice(1)
                          .map((user, idx) => (
                            <ProleagueAvatarCard
                              userData={user}
                              type={0}
                              index={idx + 1}
                              key={user.nickname}
                              teamData={teams}
                            />
                          ))}
                      {index === 1 &&
                        topWinRate
                          .slice(1)
                          .map((user, idx) => (
                            <ProleagueAvatarCard
                              userData={user}
                              type={1}
                              index={idx + 1}
                              key={user.nickname}
                              teamData={teams}
                            />
                          ))}
                      {index === 2 &&
                        topTotalGames
                          .slice(1)
                          .map((user, idx) => (
                            <ProleagueAvatarCard
                              userData={user}
                              type={2}
                              index={idx + 1}
                              key={user.nickname}
                              teamData={teams}
                            />
                          ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>프로리그 일정</CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4 p-2">
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[100px]"></div>
              <div className="w-1/3 bg-blue-600 h-[100px] flex items-center">
                <p className="font-bold text-3xl text-white text-center ">
                  으악
                </p>
              </div>
              <div className="w-1/3 bg-blue-800 h-[100px]"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
              <div className="w-1/3 bg-blue-600 h-[50px]"></div>
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
              <div className="w-1/3 bg-blue-600 h-[50px]"></div>
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
              <div className="w-1/3 bg-blue-600 h-[50px]"></div>
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
              <div className="w-1/3 bg-blue-600 h-[50px]"></div>
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
              <div className="w-1/3 bg-blue-600 h-[50px]"></div>
              <div className="w-1/3 bg-blue-800 h-[50px]"></div>
            </div>
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
