import { getNavData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";

async function TapNav() {
  const { teams, users } = await getNavData();
  return <>{<TapNavComponent teams={teams} users={users} />}</>;
}

export default TapNav;
