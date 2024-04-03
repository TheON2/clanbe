import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Tab,
  Tabs,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserTwitterCard } from "./UserTwitterCard";
import { myProfile, tabs, proleagueTeams } from "../../public/data";
import { getNavData } from "@/service/user";
import { NavData } from "../../types/types";
import TapNavComponent from "./TapNavComponent";

async function TapNav() {
  const navData = await getNavData();
  return (
    <>
      <TapNavComponent navData={navData} />
    </>
  );
}

export default TapNav;
