import Notice2 from "@/components/Notice2";
import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function NoticesPage() {
  const posts = await getAllPosts();
  return (
    <>
      <div className="hidden custom:block w-full">
        <Notice2 />
      </div>
      <div className="block custom:hidden w-full">
        <BoardLayout boardTitle={"공지사항"} announce={posts} posts={posts} />
      </div>
    </>
  );
}
