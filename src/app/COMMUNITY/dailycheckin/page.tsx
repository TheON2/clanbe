import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function DailyCheckInPage() {
  const posts = await getAllPosts();
  return (
    <BoardLayout boardTitle={"출석 체크"} announce={posts} posts={posts} />
  );
}
