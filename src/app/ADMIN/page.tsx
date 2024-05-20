import { getPointData } from "@/service/point";
import { getAllPosts } from "@/service/posts";
import { getNavData } from "@/service/user";
import AdminComponent from "@/components/AdminComponent";

export default async function ForAdminPage() {
  const { teams, users } = await getNavData();
  const { points } = await getPointData();
  const posts = await getAllPosts();

  return (
    <AdminComponent teams={teams} users={users} points={points} posts={posts} />
  );
}
