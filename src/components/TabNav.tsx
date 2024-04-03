import React from "react";
import { getNavData } from "@/service/user";
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
