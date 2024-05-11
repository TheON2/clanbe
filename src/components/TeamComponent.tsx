"use client";

import { useMemo, useState } from "react";
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
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../types/types";

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  [key: string]: string | number; // 인덱스 시그니처 추가
}

const TeamComponent = ({ teams, users }: any) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const rowsPerPage = 10;

  const column = [
    { name: "닉네임", uid: "nickname", sortable: true },
    { name: "종족", uid: "race", sortable: true },
    { name: "승", uid: "wins", sortable: true },
    { name: "패", uid: "losses", sortable: true },
    { name: "TEAR", uid: "tear", sortable: true },
    { name: "참여율", uid: "play", sortable: true },
  ];

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
        const userRace =
          raceMapping[user.BELO.race.toLowerCase()] || user.BELO.race;
        const matchesRace =
          selectedRace === "ALL" ||
          selectedRace === "" ||
          userRace === selectedRace;

        return matchesSearch && matchesRace && matchesTier;
      })
      .map((user: User) => ({
        nickname: user.nickname,
        tier: user.tear,
        race: raceMapping[user.BELO.race.toLowerCase()] || user.BELO.race,
        wins: user.BELO.tw + user.BELO.pw + user.BELO.zw,
        losses: user.BELO.tl + user.BELO.pl + user.BELO.zl,
        belo: user.BELO.belo,
      }));
    return data.sort((a: User, b: User) => b.BELO.belo - a.BELO.belo);
  }, [search, selectedRace, selectedTier, users, raceMapping]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  return (
    <div className="w-full">
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
              <Card key={team._id} className="w-[220px]">
                <CardBody>
                  <Image
                    src={team.avatar}
                    height={250}
                    width={250}
                    alt="team"
                  />
                </CardBody>
                <CardFooter>
                  <div className="flex justify-center items-center w-full">
                    <p className="font-bold text-2xl">{team.name}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
      {/* 팀 정보 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">팀 정보</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col w-full gap-2 px-2">
            <p className="font-bold text-3xl">멤버 데이터</p>
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
              <TableHeader>
                <TableColumn key="nickname">Name</TableColumn>
                <TableColumn key="tier">Tier</TableColumn>
                <TableColumn key="race">Race</TableColumn>
                <TableColumn key="wins">Wins</TableColumn>
                <TableColumn key="losses">Losses</TableColumn>
                {/* <TableColumn key="belo">BELO</TableColumn> */}
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.nickname}>
                    {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TeamComponent;
