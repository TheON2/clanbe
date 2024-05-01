import { getTeamData } from "@/service/user";
import TapNavComponent from "./TapNavComponent";
import { getUsers } from "./actions";

async function TapNav() {
  const { teams } = await getTeamData();
  const users = await getUsers();
  return (
    <>
      <TapNavComponent teams={teams} users={users.users} />
    </>
  );
}

export default TapNav;
