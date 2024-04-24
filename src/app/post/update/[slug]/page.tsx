import React, { useState, useEffect } from "react";
import { getPostData, getPostHTML } from "@/service/posts";
import CKEditorForm from "@/components/CKEditorForm";

type Props = {
  params: {
    slug: string;
  };
};

export default async function UpdatePage({ params: { slug } }: Props) {
  // API 호출을 통해 포스트 데이터를 가져옴
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
    next: { tags: ["post"] },
  });

  console.log(slug);

  // 응답을 JSON으로 변환
  const post = await response.json();
  const postHTML = await getPostHTML(post.fileUrl);
  const fileNameWithExtension = post.fileUrl.split("/").pop() as string;
  const fileName = fileNameWithExtension.replace(".html", "");

  return (
    <CKEditorForm
      post={post}
      postHTML={postHTML}
      fileName={fileName as string}
      postId={slug}
    />
  );
}
