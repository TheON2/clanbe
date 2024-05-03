import { getTeamData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";
import { getUsers } from "./actions";

async function TapNav() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/nav`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const { teams, users } = await response.json();
  return <>{<TapNavComponent teams={teams} users={users} />}</>;
}

export default TapNav;
