import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";

export default async function TacticsPage() {
  const category = "tactics";
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
      boardTitle={"전략 전술"}
      announce={posts.data}
      posts={posts.data}
      category={category}
    />
  );
}
