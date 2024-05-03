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
} from "@nextui-org/react";

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  [key: string]: string | number; // 인덱스 시그니처 추가
}

export default function BELOComponent({ users }: { users: User[] }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const rowsPerPage = 15;

  const tiers = ["ALL", "S+", "S", "A+", "A", "B+", "B", "C", "D"];
  const races = ["ALL", "Z", "T", "P"];

  const raceMapping: { [key: string]: string } = useMemo(
    () => ({
      z: "Z",
      t: "T",
      p: "P",
    }),
    []
  ); // Dependencies array is empty, it only initializes once

  const getTier = (belo: number) => {
    if (belo >= 1500) return "S+";
    if (belo >= 1300) return "S";
    if (belo >= 1100) return "A+";
    if (belo >= 1000) return "A";
    if (belo >= 900) return "B+";
    if (belo >= 800) return "B";
    if (belo >= 700) return "C";
    return "D";
  };

  const filteredData: UserItem[] = useMemo(() => {
    const data = users
      .filter((user) => {
        const matchesSearch = user.nickname
          .toLowerCase()
          .includes(search.toLowerCase());
        const belo = user.BELO.belo;
        const matchesTier =
          selectedTier === "ALL" ||
          selectedTier === "" ||
          getTier(belo) === selectedTier;
        const userRace =
          raceMapping[user.BELO.race.toLowerCase()] || user.BELO.race;
        const matchesRace =
          selectedRace === "ALL" ||
          selectedRace === "" ||
          userRace === selectedRace;

        return matchesSearch && matchesTier && matchesRace;
      })
      .map((user) => ({
        nickname: user.nickname,
        tier: getTier(user.BELO.belo),
        race: raceMapping[user.BELO.race.toLowerCase()] || user.BELO.race,
        wins: user.BELO.tw + user.BELO.pw + user.BELO.zw,
        losses: user.BELO.tl + user.BELO.pl + user.BELO.zl,
        belo: user.BELO.belo,
      }));
    return data.sort((a, b) => b.belo - a.belo);
  }, [search, selectedTier, selectedRace, users, raceMapping]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  return (
    <div className="flex flex-col w-full gap-2 px-2">
      <p className="font-bold text-3xl">BELO 유저 데이터</p>
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
          <TableColumn key="belo">BELO</TableColumn>
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
  );
}
