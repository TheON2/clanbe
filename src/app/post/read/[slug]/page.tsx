import PostForm from "@/components/PostForm";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

// 페이지 컴포넌트 정의
export default async function PostPage({ params: { slug } }: Props) {
  // API 호출을 통해 포스트 데이터를 가져옴
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
    next: { tags: ["post"] },
  });

  // 응답을 JSON으로 변환
  const post = await response.json();

  // PostForm 컴포넌트에 post 데이터 전달
  return <PostForm post={post} />;
}
