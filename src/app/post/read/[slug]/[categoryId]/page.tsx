import BoardLayout from "@/components/BoardLayout";
import PostForm from "@/components/PostForm";
import { Post } from "@/service/posts";
import { revalidateTag } from "next/cache";
import React from "react";
import { getSupport } from "@/service/supports";

async function getAllPost() {
  "use server";
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: "allposts" }),
    next: { tags: ["post"] },
  });
  const posts = await response.json();
  return posts;
}

async function getUser(author: string) {
  "use server";
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: author }),
    next: { tags: ["post"] },
  });
  return await response.json();
}

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
  const posts = await getAllPost();
  revalidateTag("post");

  const post = posts.data.find((post: Post) => post._id === slug);

  const user = await getUser(post.author);
  const { supportData } = await getSupport(slug);

  return (
    <div className="w-full mt-8">
      <PostForm post={post} userData={user.user} supportData={supportData} />
      <BoardLayout
        boardTitle={"전체 게시글"}
        announce={posts.data}
        posts={posts.data}
        category={categoryId}
      />
    </div>
  );
}
