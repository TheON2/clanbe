import BoardLayout from "@/components/BoardLayout";
import PostForm from "@/components/PostForm";
import { getAllPosts, getPosts, Post } from "@/service/posts";
import { revalidateTag } from "next/cache";
import React from "react";
import { getSupport } from "@/service/supports";
import { getProfile } from "@/service/user";

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
  const posts = await getPosts("allposts");
  const post = posts.data.find((post: Post) => post._id === slug);
  const user = await getProfile(post.author);
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
