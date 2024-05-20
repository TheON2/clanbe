import { getNavData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";
import { getPointData } from "@/service/point";

async function TapNav() {
  const { teams, users } = await getNavData();
  const { points } = await getPointData();
  return <>{<TapNavComponent teams={teams} users={users} points={points} />}</>;
}

export default TapNav;
