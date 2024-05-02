"use client";

import { useMemo, useState } from "react";
import { playersData } from "../../../public/data";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { User } from "next-auth";

export default function BELOComponent({ users }: { users: User[] }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const rowsPerPage = 15;

  const tiers = ["ALL", "S+", "S", "A+", "A", "B+", "B", "C", "D"];
  const races = ["ALL", "Zerg", "Terran", "Protoss"];

  const raceMapping: { [key: string]: string } = useMemo(
    () => ({
      z: "Zerg",
      t: "Terran",
      p: "Protoss",
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
    return "D"; // For all BELO less than 700
  };

  const calculateWins = (beloDetails: any) =>
    beloDetails.zw + beloDetails.pw + beloDetails.tw;
  const calculateLosses = (beloDetails: any) =>
    beloDetails.zl + beloDetails.pl + beloDetails.tl;

  const reverseRaceMapping = useMemo(() => {
    return Object.fromEntries(
      Object.entries(raceMapping).map(([key, value]) => [
        value.toLowerCase(),
        key,
      ])
    );
  }, [raceMapping]); // 종족 이름을 소문자로 매핑하여 보다 일관된 비교를 가능하게 함

  const filteredData = useMemo(() => {
    return playersData
      .filter((player) => {
        const matchesSearch = player.nickname
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesTier =
          selectedTier === "ALL" || selectedTier === ""
            ? true
            : getTier(Number(player.belo)) === selectedTier;
        const matchesRace =
          selectedRace === "ALL" || selectedRace === ""
            ? true
            : player.race.toLowerCase() ===
              reverseRaceMapping[selectedRace.toLowerCase()]; // 소문자 비교
        return matchesSearch && matchesTier && matchesRace;
      })
      .map((player) => ({
        ...player,
        tier: getTier(Number(player.belo)),
        race: raceMapping[player.race.toLowerCase()] || player.race, // 소문자로 키 검색
      }));
  }, [search, selectedTier, selectedRace, raceMapping, reverseRaceMapping]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  return (
    <div className=" flex flex-col w-full gap-4">
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
              {raceMapping[race] || race}
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
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
