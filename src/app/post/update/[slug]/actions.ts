"use server";

import { getPostHTML } from "@/service/posts";
import { revalidateTag } from "next/cache";

export async function getPost(slug: any) {
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
  const postHTML = await getPostHTML(post.fileUrl);
  const fileNameWithExtension = post.fileUrl.split("/").pop() as string;
  const fileName = fileNameWithExtension.replace(".html", "");

  return { post, postHTML, fileName };
}

export async function updatePost(postData: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postData }),
    cache: "no-store",
  });
  revalidateTag("post");
  return await response.json();
}
