import PointRanking from "@/components/PointRanking";
import { getUsers } from "@/service/user";

export default async function RankingPage() {
  const users = await getUsers();
  return <PointRanking users={users.users} />;
}
