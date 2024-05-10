"use server";

import BELOComponent from "@/components/BELOCompoent";
import { getUsers } from "@/service/user";


export default async function BeloSeasonPage() {
  const users = await getUsers();
  return <BELOComponent users={users.users} />;
}
