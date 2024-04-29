import Notice2 from "@/components/Notice2";
import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";
import NoticeBoardLayout from "@/components/NoticeBoardLayout";

export default async function NoticesPage() {
  const posts = await getAllPosts();
  return (
    <>
      <div className="w-full">
        <NoticeBoardLayout
          boardTitle={"공지사항"}
          announce={posts}
          posts={posts}
        />
      </div>
    </>
  );
}
