import PointBetting from "@/components/PointBetting";
import { getBettingData } from "@/service/betting";
import { getUsers } from "@/service/user";

export default async function BettingPage() {
  const { bettings } = await getBettingData();
  const { users } = await getUsers();
  return <PointBetting bettings={bettings} users={users} />;
  // return <div>오픈예정</div>;
}
