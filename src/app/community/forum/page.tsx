import BoardLayout from "@/components/BoardLayout";
import { getAllPosts } from "@/service/posts";

export default async function ForumPage() {
  const category = "forum";
  // API 호출을 통해 포스트 데이터를 가져옴
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
    next: { tags: ["post"] },
    cache: "no-store",
  });

  // 응답을 JSON으로 변환
  const posts = await response.json();

  return (
    <BoardLayout
      boardTitle={"자유 게시판"}
      announce={posts.data}
      posts={posts.data}
      category={category}
    />
  );
}
