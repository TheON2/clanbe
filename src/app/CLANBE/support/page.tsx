import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function SupportPage() {
  const posts = await getAllPosts();
  return (
    <BoardLayout boardTitle={"클랜 후원"} announce={posts} posts={posts} />
  );
}
