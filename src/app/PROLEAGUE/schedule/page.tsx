import { ProleagueSchedule } from "@/components/ProleagueSchedule";
import TeamComponent from "@/components/TeamComponent/TeamComponent";
import { getLeagueEvent } from "@/service/leagueevent";
import { getTeamData } from "@/service/team";

export default async function Page() {
  const { teams, users } = await getTeamData();
  const { leagueEvents } = await getLeagueEvent();
  return (
    <ProleagueSchedule
      teams={teams}
      users={users}
      leagueEvents={leagueEvents}
    />
  );
}
