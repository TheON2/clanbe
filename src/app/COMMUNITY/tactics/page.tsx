import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function TacticsPage() {
  const posts = await getAllPosts();
  return (
    <BoardLayout boardTitle={"전략/전술"} announce={posts} posts={posts} />
  );
}
