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
import { Team } from "../../../types/types";
import ProfileCard from "../ProfileCard";
import ProleagueProfileCard from "../ProleagueProfileCard";
import ProleagueAvatarCard from "../ProleagueAvatarCard";

import { EditIcon } from "../../../public/EditIcon";
import { EyeIcon } from "../../../public/EyeIcon";
import { DeleteIcon } from "../../../public/DeleteIcon";
import { updateUserTeam } from "@/service/team";
import SubmitModal from "../SubmitModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

const TeamPage = ({ teams, users }: any) => {
  type User = (typeof users)[0];
  // 모달 상태 추가
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
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

  // 선택한 팀의 승률을 계산합니다.
  const winRate = useMemo(() => {
    if (selectedTeam) {
      return (selectedTeam.w / (selectedTeam.w + selectedTeam.l)) * 100;
    }
    return 0; // 선택된 팀이 없다면 0을 반환합니다.
  }, [selectedTeam]);
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

  return (
    <div className="w-full">
      <SubmitModal
        title={"알림"}
        text={modalMessage}
        isOpen={isSubmit}
        onClose={() => setIsSubmit(false)}
      />
      {/* 팀 리스트 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">팀 리스트</p>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 justify-center flex-wrap">
            {" "}
            {/* flex-wrap 추가로 반응형 처리 */}
            {teams.map((team: Team) => (
              <div
                key={team._id}
                onClick={() => {
                  setSelectedTeamName(team.name);
                }}
              >
                <Card key={team._id} className="w-[220px] h-full">
                  <CardBody>
                    <Image
                      src={team.avatar}
                      height={200}
                      width={200}
                      alt="team"
                    />
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-center items-center w-full">
                      <p className="font-bold text-2xl">{team.name}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
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
      {/* 팀 정보 */}
      {selectedTeamName !== "" && (
        <Card className="">
          <CardHeader>
            <div className="flex flex-wrap my-2 justify-center items-center mx-auto gap-4">
              <Card key={selectedTeam?._id} className="w-[220px] h-full">
                <CardBody>
                  <Image
                    src={selectedTeam?.avatar}
                    height={200}
                    width={200}
                    alt="team"
                  />
                </CardBody>
                <CardFooter>
                  <div className="flex justify-center items-center w-full">
                    <p className="font-bold text-2xl">{selectedTeam?.name}</p>
                  </div>
                </CardFooter>
              </Card>
              <div>
                <div className="flex flex-col gap-2 mt-4 justify-center items-center">
                  <p className="mx-4 font-bold text-2xl">
                    팀장 : {selectedTeam?.leader}
                  </p>
                  <p className="mx-4 font-bold text-2xl">
                    팀장 : {selectedTeam?.subleader}
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
                      {selectedTeam?.ranking}위 {selectedTeam?.w}W{" "}
                      {selectedTeam?.l}L
                    </p>
                    <p className="mx-4 font-bold">득실 {selectedTeam?.point}</p>
                    <p className="mx-4 font-bold">
                      승점 {selectedTeam?.winpoint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col md:w-2/3 gap-2 mx-auto">
              <div className="flex gap-2 md:w-1/2">
                <Input
                  placeholder="닉네임"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <Select
                  aria-label="Example table with client side pagination"
                  placeholder="티어"
                  value={selectedTier}
                  onChange={(e) => {
                    setSelectedTier(e.target.value);
                    setPage(1);
                  }}
                >
                  {tiers.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  aria-label="Example table with client side pagination"
                  placeholder="종족"
                  value={selectedRace}
                  onChange={(e) => {
                    setSelectedRace(e.target.value);
                    setPage(1);
                  }}
                >
                  {races.map((race) => (
                    <SelectItem key={race} value={race}>
                      {race}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
                classNames={{
                  wrapper: "min-h-[222px]",
                }}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.align}
                      width={column.width}
                      className="text-center"
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item.nickname} className="text-center">
                      {(columnKey) => (
                        <TableCell
                          className={
                            columnKey === "tier"
                              ? `${
                                  tierColorMap[item.tier] || "bg-gray-100"
                                } text-center`
                              : "text-center"
                          }
                        >
                          {renderCell(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default TeamPage;
