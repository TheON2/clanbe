"use client";

import { useMemo, useState } from "react";
import { beUsers, playersData, pointMember } from "../../../public/data";
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
import { Match } from "../../../types/types";

export default function BELOMatchComponent({ matchs }: { matchs: Match[] }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [winnerSearch, setWinnerSearch] = useState("");
  const [loserSearch, setLoserSearch] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const rowsPerPage = 10;

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

  const reverseRaceMapping = useMemo(() => {
    return Object.fromEntries(
      Object.entries(raceMapping).map(([key, value]) => [value, key])
    );
  }, [raceMapping]); // Depend on raceMapping

  const filteredData = useMemo(() => {
    return matchs
      .filter((match) => {
        const matchesWinner =
          winnerSearch === "" ||
          match.winner.toLowerCase().includes(winnerSearch.toLowerCase());
        const matchesLoser =
          loserSearch === "" ||
          match.loser.toLowerCase().includes(loserSearch.toLowerCase());
        const matchesMap =
          mapSearch === "" ||
          match.map.toLowerCase().includes(mapSearch.toLowerCase());
        const matchesRace =
          selectedRace === "ALL" || selectedRace === ""
            ? true
            : match.wrace === reverseRaceMapping[selectedRace] ||
              match.lrace === reverseRaceMapping[selectedRace];
        return matchesWinner && matchesLoser && matchesRace && matchesMap;
      })
      .map((match) => ({
        ...match,
        wrace: raceMapping[match.wrace] || match.wrace,
        lrace: raceMapping[match.lrace] || match.lrace,
      }));
  }, [
    loserSearch,
    mapSearch,
    winnerSearch,
    selectedRace,
    raceMapping,
    reverseRaceMapping,
    matchs,
  ]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  return (
    <div className=" flex flex-col w-full gap-4 px-4">
      <p className="font-bold text-3xl">BELO 기록조회 / 등록</p>
      <div className="flex gap-2 md:w-1/2">
        <Input
          placeholder="승자"
          value={winnerSearch}
          onChange={(e) => {
            setWinnerSearch(e.target.value);
            setPage(1);
          }}
        />
        <Input
          placeholder="패배자"
          value={loserSearch}
          onChange={(e) => {
            setLoserSearch(e.target.value);
            setPage(1);
          }}
        />
        <Input
          placeholder="Map"
          value={mapSearch}
          onChange={(e) => {
            setMapSearch(e.target.value);
            setPage(1);
          }}
        />
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
          {/* <TableColumn key="name">분류</TableColumn> */}
          <TableColumn key="winner">Winner</TableColumn>
          <TableColumn key="wrace">Race</TableColumn>
          <TableColumn key="loser">Loser</TableColumn>
          <TableColumn key="lrace">Race</TableColumn>
          <TableColumn key="map">MAP</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
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
