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
  CircularProgress,
  Divider,
  Switch,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../../types/types";
import ProfileCard from "../ProfileCard";
import ProleagueProfileCard from "../ProleagueProfileCard";
import ProleagueAvatarCard from "../ProleagueAvatarCard";
import TeamPage from "./TeamPage";
import AdminPage from "./AdminPage";

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
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="w-full">
      <div className="m-2">
        {!isSelected ? (
          <>
            <Button
              color="primary"
              onClick={() => {
                setIsSelected(true);
              }}
            >
              관리자 페이지
            </Button>
          </>
        ) : (
          <>
            <Button
              color="primary"
              onClick={() => {
                setIsSelected(false);
              }}
            >
              일반 페이지
            </Button>
          </>
        )}
      </div>
      {!isSelected ? (
        <>
          <TeamPage teams={teams} users={users} />
        </>
      ) : (
        <>
          <AdminPage teams={teams} users={users} />
        </>
      )}
    </div>
  );
};

export default TeamComponent;
