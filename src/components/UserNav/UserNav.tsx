import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tab,
  Tabs,
  Tooltip,
  User,
} from "@nextui-org/react";
import { NextPage } from "next";
import { UserTwitterCard } from ".././UserTwitterCard";
import Image from "next/image";
import { Team } from "../../../types/types";
import { tabs } from "../../../public/data";
import { User as MyUser } from "next-auth";
import { signOut } from "next-auth/react";
import { LogoutIcon } from "../../../public/logout";
import { UserSettingIcon } from "../../../public/UserSettingIcon";
import UserTab from "./UserTab";
import MobileUserTab from "./MobileUserTab";

type UserNavProps = {
  user: MyUser;
  teams: Team[];
  users: MyUser[];
};

const UserNav = ({ user, teams,users }: UserNavProps) => {
  return (
    <>
      <div className="hidden md:block">
        <UserTab user={user} teams={teams} users={users} />
      </div>
      <div className="block md:hidden">
        <MobileUserTab user={user} teams={teams} users={users} />
      </div>
    </>
  );
};

export default UserNav;
