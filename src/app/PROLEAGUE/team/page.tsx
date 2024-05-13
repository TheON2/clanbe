import TeamComponent from "@/components/TeamComponent/TeamComponent";
import { getNavData } from "@/service/user";

export default async function Page() {
  const { teams, users } = await getNavData();
  return <TeamComponent teams={teams} users={users} />;
}
