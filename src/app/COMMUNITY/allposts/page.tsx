import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function AllPostPage() {
  const posts = await getAllPosts();
  console.log(posts);
  return (
    <BoardLayout boardTitle={"전체 게시글"} announce={posts} posts={posts} />
  );
}
