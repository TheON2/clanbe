"use server";

import { revalidateTag } from "next/cache";

type createCommentProps = {
  postid: string;
  author: string|null|undefined;
  text: string;
};

export async function createComment({
  postid,
  author,
  text,
}: createCommentProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/comment/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postData: { postid, author, text } }),
    }
  );
  revalidateTag("post");
  return await response.json();
}
