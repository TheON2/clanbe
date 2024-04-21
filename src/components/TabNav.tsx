import React, { useState } from "react";
import { getNavData, getTeamData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";
import TapNavComponent2 from "./TapNavComponent2";
import { useSelector } from "react-redux";
import { UserState } from "../../redux/reducers/userSlice";
import { TeamState } from "../../redux/reducers/teamSlice";
import { useSession } from "next-auth/react";

async function TapNav() {
  const { teams } = await getTeamData();

  return (
    <>
      <TapNavComponent teams={teams} />
    </>
  );
}

export default TapNav;
