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
