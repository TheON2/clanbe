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
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";

  return (
    <>
      {isLoggedIn ? <p>{session.user?.name}</p> : <p>로그인안됨</p>}
      {isLoggedIn ? (
        <TapNavComponent user={session.user} teams={teams} />
      ) : (
        <TapNavComponent2 />
      )}
    </>
  );
}

export default TapNav;
