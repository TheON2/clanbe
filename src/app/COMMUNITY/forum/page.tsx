import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function ForumPage() {
  const posts = await getAllPosts();
  console.log(posts);
  return (
    <BoardLayout boardTitle={"자유 게시판"} announce={posts} posts={posts} />
  );
}
