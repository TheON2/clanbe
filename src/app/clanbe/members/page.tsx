import MemberComponent from "@/components/MemberComponent";
import { getUsers } from "@/service/user";


export default async function MembersPage() {
  const users = await getUsers();
  return <MemberComponent users={users.users} />;
}
