"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { EventType, LeagueEvent } from "../../types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CircularProgress,
  Button,
  User as UiUser,
  Tabs,
  Tab,
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../types/types";
import ProleagueProfileCard from "./ProleagueProfileCard";
import ProleagueAvatarCard from "./ProleagueAvatarCard";

import { EditIcon } from "../../public/EditIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProleagueCreateModal from "./ProleagueCreateModal";
import { deleteLeagueEvent } from "@/service/leagueevent";

interface DateClickArguments {
  dateStr: string;
  allDay: boolean;
}

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
  "C+": "bg-red-200",
};

export const ProleagueSchedule = ({ teams, users, leagueEvents }: any) => {
  type User = (typeof users)[0];
  // 모달 상태 추가
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const userGrade = user?.grade ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editMatchData, setEditMatchData] = useState(undefined);

  const handleDeleteClick = async (matchId: string) => {
    if (!matchId) return;

    try {
      const response = await deleteLeagueEvent(matchId);
      if (response) {
        setModalMessage("경기 이벤트가 성공적으로 삭제되었습니다.");
      } else {
        setModalMessage("경기 이벤트 삭제에 실패했습니다.");
      }
    } catch (error) {
      setModalMessage("경기 이벤트 삭제 중 오류가 발생했습니다.");
    }
    setIsSubmit(true);
  };

  const handleEditClick = (match: any) => {
    setEditMatchData(match);
    setIsCreate(true);
  };

  const getTeamNameById = useCallback(
    (id: string) => {
      const team = teams.find((team: Team) => team._id.toString() === id);
      return team ? team.name : "Unknown";
    },
    [teams]
  );

  const formattedLeagueEvents = leagueEvents.map((event: LeagueEvent) => ({
    ...event,
    id: event._id,
    title: `BPL ${getTeamNameById(event.homeId)} vs ${getTeamNameById(
      event.awayId
    )}`,
    description: `Be클랜 프로리그 ${getTeamNameById(
      event.homeId
    )} vs ${getTeamNameById(event.awayId)}`,
    date: event.date,
    author: "sniperad@naver.com",
    type: "league",
    homeTeamName: getTeamNameById(event.homeId),
    awayTeamName: getTeamNameById(event.awayId),
  }));

  const renderCell = useCallback(
    (user: User, columnKey: React.Key, result?: number, isHome?: boolean) => {
      const cellValue = user[columnKey as keyof User];
      let cellClass = "";

      if (columnKey === "homePlayer" && result !== undefined) {
        cellClass =
          result === 1
            ? "bg-gradient-to-r from-blue-200 to-blue-400 text-black"
            : result === 2
            ? "bg-gradient-to-r from-red-200 to-red-400 text-black"
            : "";
      } else if (columnKey === "awayPlayer" && result !== undefined) {
        cellClass =
          result === 2
            ? "bg-gradient-to-r from-blue-200 to-blue-400 text-black"
            : result === 1
            ? "bg-gradient-to-r from-red-200 to-red-400 text-black"
            : "";
      }

      switch (columnKey) {
        case "homePlayer":
        case "awayPlayer":
          return (
            <div
              className={`text-center text-xs font-bold ${cellClass} p-1 rounded-md shadow-md transform transition-transform hover:scale-105`}
            >
              {user ? `${user.nickname} (${user.tear})` : "N/A"}
            </div>
          );
        case "map":
          return (
            <div className="p-2 bg-gray-50 rounded-md shadow">{cellValue}</div>
          );
        case "tier":
          return (
            <div className="p-2 bg-gray-50 rounded-md shadow">{cellValue}</div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

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

  const findUser = (nickname: string): User | "선수미정" =>
    users.find((user: User) => user.nickname === nickname) || "선수미정";

  const findTeam = (teamid: string) =>
    teams.find((team: Team) => team._id === teamid);

  const [page, setPage] = useState(1);
  const [isSelected, setIsSelected] = useState(false);

  const rowsPerPage = 1;

  const { topWins, topWinRate, topTotalGames } = useMemo(() => {
    // 다승 계산
    const topWins = [...users]
      .sort((a, b) => {
        const totalWinsA = a.league.pw + a.league.tw + a.league.zw;
        const totalWinsB = b.league.pw + b.league.tw + b.league.zw;
        return totalWinsB - totalWinsA; // 내림차순 정렬
      })
      .slice(0, 5);

    // 승률 계산
    const topWinRate = [...users]
      .sort((a, b) => {
        const totalWinsA = a.league.pw + a.league.tw + a.league.zw;
        const totalGamesA =
          totalWinsA + a.league.pl + a.league.tl + a.league.zl;
        const totalWinsB = b.league.pw + b.league.tw + b.league.zw;
        const totalGamesB =
          totalWinsB + b.league.pl + b.league.tl + b.league.zl;
        const winRateA = totalGamesA > 0 ? totalWinsA / totalGamesA : 0;
        const winRateB = totalGamesB > 0 ? totalWinsB / totalGamesB : 0;
        return winRateB - winRateA; // 내림차순 정렬
      })
      .slice(0, 5);

    // 전체 경기 수 계산
    const topTotalGames = [...users]
      .sort((a, b) => {
        const totalGamesA =
          a.league.pw +
          a.league.pl +
          a.league.tw +
          a.league.tl +
          a.league.zw +
          a.league.zl;
        const totalGamesB =
          b.league.pw +
          b.league.pl +
          b.league.tw +
          b.league.tl +
          b.league.zw +
          b.league.zl;
        return totalGamesB - totalGamesA; // 내림차순 정렬
      })
      .slice(0, 5);

    return { topWins, topWinRate, topTotalGames };
  }, [users]);

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
        const totalWinsA = a.league.pw + a.league.tw + a.league.zw;
        const totalWinsB = b.league.pw + b.league.tw + b.league.zw;
        return totalWinsB - totalWinsA; // 내림차순 정렬
      })
      .slice(0, 5);

    const topWinRate = [...topTeamUsers]
      .sort((a, b) => {
        const totalWinsA = a.league.pw + a.league.tw + a.league.zw;
        const totalGamesA =
          totalWinsA + a.league.pl + a.league.tl + a.league.zl;
        const totalWinsB = b.league.pw + b.league.tw + b.league.zw;
        const totalGamesB =
          totalWinsB + b.league.pl + b.league.tl + b.league.zl;
        const winRateA = totalGamesA > 0 ? totalWinsA / totalGamesA : 0;
        const winRateB = totalGamesB > 0 ? totalWinsB / totalGamesB : 0;
        return winRateB - winRateA; // 내림차순 정렬
      })
      .slice(0, 5);

    const topTotalGames = [...topTeamUsers]
      .sort((a, b) => {
        const totalGamesA =
          a.league.pw +
          a.league.pl +
          a.league.tw +
          a.league.tl +
          a.league.zw +
          a.league.zl;
        const totalGamesB =
          b.league.pw +
          b.league.pl +
          b.league.tw +
          b.league.tl +
          b.league.zw +
          b.league.zl;
        return totalGamesB - totalGamesA; // 내림차순 정렬
      })
      .slice(0, 5);

    return { topWins, topWinRate, topTotalGames };
  }, [topTeamUsers]);

  const getMatchResult = (sets: any) => {
    const homeWins = sets.filter((set: any) => set.result === 1).length;
    const awayWins = sets.filter((set: any) => set.result === 2).length;
    return {
      homeWins,
      awayWins,
      result:
        homeWins > awayWins ? "home" : awayWins > homeWins ? "away" : "draw",
    };
  };

  const [selectedEvent, setSelectedEvent] = useState<LeagueEvent | null>();

  const filteredEvents = useMemo(() => {
    if (selectedDate) {
      return leagueEvents.filter((event: EventType) =>
        event.date.startsWith(selectedDate)
      );
    } else if (selectedEvent) {
      return formattedLeagueEvents.filter(
        (event: any) => event.id === selectedEvent._id
      );
    }
    return [];
  }, [selectedDate, selectedEvent, leagueEvents, formattedLeagueEvents]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [page, filteredEvents]);

  const pages = Math.ceil(filteredEvents.length / rowsPerPage);

  const handleDateClick = (arg: DateClickArg) => {
    // 날짜를 선택하면 selectedDate 상태를 업데이트하고, selectedEvent를 null로 초기화
    setSelectedDate(arg.dateStr);
    setSelectedEvent(null);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // 이벤트를 선택하면 selectedEvent 상태를 해당 이벤트로 설정하고, selectedDate를 null로 초기화
    const event = formattedLeagueEvents.find(
      (event: EventType) => event.id === clickInfo.event.id
    );
    setSelectedEvent(event);
    setSelectedDate(null);
  };

  useEffect(() => {
    if (!isCreate) {
      setEditMatchData(undefined);
    }
  }, [isCreate]);

  return (
    <div className="w-full">
      <Tabs>
        <Tab key={"팀순위/선수랭킹"} title="팀순위/선수랭킹">
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
                      <p className="font-bold text-2xl">
                        {sortedTeams[0]?.name}
                      </p>
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
                      <p className="mx-4 font-bold">
                        득실 {sortedTeams[0]?.point}
                      </p>
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
                {["다승", "승률", "전체 경기"].map(
                  (category, index: number) => (
                    <div key={index}>
                      <Card key={index} className="w-[300px] h-full">
                        <p
                          className={`mt-4 font-bold text-2xl dark:text-blue-dark text-center`}
                        >
                          {category}
                        </p>
                        <CardBody>
                          <div>
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
                  )
                )}
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"프로리그 일정표"} title="프로리그 일정표">
          <Card className="w-full flex justify-center items-center">
            <CardHeader className="">
              <div className="flex flex-col w-full justify-center items-center gap-2">
                <div>
                  {userGrade > 3 && (
                    <Button onPress={() => setIsCreate(true)}>
                      리그정보 등록
                    </Button>
                  )}
                </div>
                <div>
                  <FullCalendar
                    plugins={[
                      dayGridPlugin,
                      interactionPlugin,
                      timeGridPlugin,
                      listPlugin,
                    ]}
                    initialView="listWeek"
                    events={formattedLeagueEvents}
                    weekends={true}
                    locale={koLocale}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "listWeek,dayGridMonth",
                    }}
                    height={"300px"}
                    editable={typeof userGrade === "number" && userGrade > 4}
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className=" w-full">
              {leagueEvents.length > 0 &&
                leagueEvents.map((match: any, index: string) => {
                  const homeTeam = findTeam(match.homeId);
                  const awayTeam = findTeam(match.awayId);
                  const { homeWins, awayWins, result } = getMatchResult(
                    match.sets
                  );
                  return (
                    <div key={index} className="w-full border rounded-lg my-2">
                      {userGrade > 3 && (
                        <div className="flex gap-3 justify-end mt-4 mr-4">
                          <Button
                            color="success"
                            isIconOnly
                            onClick={() => handleEditClick(match)}
                            startContent={<EditIcon fill="currentColor" />}
                          />
                          <Button
                            color="danger"
                            isIconOnly
                            onClick={() => handleDeleteClick(match._id)}
                            startContent={<DeleteIcon fill="currentColor" />}
                          />
                        </div>
                      )}
                      <div className="flex justify-center items-center mb-2 gap-4">
                        <div className="text-center font-bold">
                          <p>{match.title}</p>
                          <p>
                            {new Date(match.date).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col items-center">
                          <Image
                            src={homeTeam?.avatar || "/default-avatar.png"}
                            alt="Home Team Avatar"
                            width={200}
                            height={200}
                            className="rounded-md mr-2"
                          />
                          <div className="text-center">
                            <p className="font-bold">
                              {homeTeam?.name || "N/A"}
                            </p>
                            <p className="font-bold">{homeWins}</p>
                          </div>
                        </div>
                        <Table
                          aria-label="Proleague Schedule"
                          className="md:w-1/2 w-full"
                        >
                          <TableHeader>
                            <TableColumn>SET</TableColumn>
                            <TableColumn>MAP</TableColumn>
                            <TableColumn>Home</TableColumn>
                            <TableColumn>티어</TableColumn>
                            <TableColumn>Away</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {match.sets.map((game: any, idx: string) => {
                              const homeUser = findUser(game.homePlayer);
                              const awayUser = findUser(game.awayPlayer);
                              return (
                                <TableRow key={idx}>
                                  <TableCell className="text-center text-xs w-[50px]">
                                    {Number(idx + 1) === 5 ? "ACE" : idx + 1}
                                  </TableCell>
                                  <TableCell className="text-center text-xs w-[100px]">
                                    {game?.map}
                                  </TableCell>
                                  <TableCell>
                                    {renderCell(
                                      homeUser,
                                      "homePlayer",
                                      game.result,
                                      true
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {game?.tier}
                                  </TableCell>
                                  <TableCell>
                                    {renderCell(
                                      awayUser,
                                      "awayPlayer",
                                      game.result,
                                      false
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <div className="flex flex-col items-center">
                          <Image
                            src={awayTeam?.avatar || "/default-avatar.png"}
                            alt="Away Team Avatar"
                            width={200}
                            height={200}
                            className="rounded-md ml-2"
                          />
                          <div className="text-center">
                            <p className="font-bold">
                              {awayTeam?.name || "N/A"}
                            </p>
                            <p className="font-bold">{awayWins}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Tab>
      </Tabs>
      <ProleagueCreateModal
        title="프로리그 일정등록"
        isOpen={isCreate}
        onClose={() => setIsCreate(false)}
        teams={teams}
        users={users}
        matchData={editMatchData}
      />
      <SubmitModal
        title={"알림"}
        text={modalMessage}
        isOpen={isSubmit}
        onClose={() => setIsSubmit(false)}
      />
    </div>
  );
};
