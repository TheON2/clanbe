import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function FeedBackPage() {
  const posts = await getAllPosts();
  return (
    <BoardLayout boardTitle={"건의 사항"} announce={posts} posts={posts} />
  );
}
