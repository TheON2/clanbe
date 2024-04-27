"use server";

import { revalidateTag } from "next/cache";

type deleteCommentProps = {
  postid: string;
  commentid: string;
};

export async function deleteComment({ postid, commentid }: deleteCommentProps) {
  console.log(postid, commentid);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/comment/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postid, commentid }),
    }
  );
  revalidateTag("post");
  return await response.json();
}
