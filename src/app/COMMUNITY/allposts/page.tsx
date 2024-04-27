import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";
import { getAllPosts } from "@/service/posts";
import { revalidateTag } from "next/cache";

// async function getAllPost() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ category: "allposts" }),
//     next: { tags: ["post"] },
//     // cache: "no-store",
//   });

//   const posts = await response.json();
//   return posts;
// }

export default async function AllPostPage() {
  // 응답을 JSON으로 변환
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: "allposts" }),
    next: { tags: ["post"] },
    // cache: "no-store",
  });

  const posts = await response.json();

  return (
    <BoardLayout
      boardTitle={"전체 게시글"}
      announce={posts.data}
      posts={posts.data}
    />
  );
}
