import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function IntroDucePage() {
  const posts = await getAllPosts();
  return (
    <BoardLayout boardTitle={"가입 인사"} announce={posts} posts={posts} />
  );
}
