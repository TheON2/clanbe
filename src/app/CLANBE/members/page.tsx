import MemberComponent from "@/components/MemberComponent";
import { getUsers } from "@/components/TapNav/actions";

export default async function MembersPage() {
  const users = await getUsers();
  return <MemberComponent users={users.users} />;
}
