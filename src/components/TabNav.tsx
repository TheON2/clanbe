"use client";

import React from "react";
import { getNavData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";
import TapNavComponent2 from "./TapNavComponent2";
import { useSelector } from "react-redux";
import { UserState } from "../../redux/reducers/userSlice";
import { TeamState } from "../../redux/reducers/teamSlice";

function TapNav() {
  //const navData = await getNavData();

  const user = useSelector((state: { user: UserState }) => state.user);
  const teams = useSelector((state: { team: TeamState[] }) => state.team);
  return (
    <>
      {user.nickname ? (
        <TapNavComponent navData={{ user,teams }} />
      ) : (
        <TapNavComponent2 />
      )}
    </>
  );
}

export default TapNav;
