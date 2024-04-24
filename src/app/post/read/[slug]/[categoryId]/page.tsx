import BoardLayout from "@/components/BoardLayout";
import PostForm from "@/components/PostForm";
import { Post } from "@/service/posts";
import React from "react";

type Props = {
  params: {
    slug: string;
    categoryId: string;
  };
};

// 페이지 컴포넌트 정의
export default async function PostPage({
  params: { slug, categoryId },
}: Props) {
  // API 호출을 통해 포스트 데이터를 가져옴
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: categoryId }),
    next: { tags: ["post"] },
    cache: "no-store",
  });

  // 응답을 JSON으로 변환
  const posts = await response.json();

  const post = posts.data.find((post: Post) => post._id === slug);
  console.log("개별 포스트");
  console.log(post);

  // PostForm 컴포넌트에 post 데이터 전달
  return (
    <div className="w-full mt-8">
      <PostForm post={post} />
      <BoardLayout
        boardTitle={"전체 게시글"}
        announce={posts.data}
        posts={posts.data}
      />
    </div>
  );
}
