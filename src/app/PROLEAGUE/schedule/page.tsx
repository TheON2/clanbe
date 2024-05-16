import { ProleagueSchedule } from "@/components/ProleagueSchedule";
import TeamComponent from "@/components/TeamComponent/TeamComponent";
import { getTeamData } from "@/service/team";

export default async function Page() {
  const { teams, users } = await getTeamData();
  return <ProleagueSchedule teams={teams} users={users} />;
}
