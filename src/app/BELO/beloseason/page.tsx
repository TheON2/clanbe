"use server";

import BELOComponent from "@/components/BELOComponent/BELOCompoent";
import { getUsers } from "@/components/TapNav/actions";

export default async function BeloSeasonPage() {
  const users = await getUsers();
  return <BELOComponent users={users.users} />;
}
