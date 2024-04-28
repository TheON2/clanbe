"use server";

import { revalidateTag } from "next/cache";

type deleteCommentProps = {
  postid: string;
  commentid: string;
  replyid: string;
};

export async function deleteReply({ postid, commentid, replyid }: deleteCommentProps) {
  console.log(postid, commentid);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/reply/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postid, commentid, replyid }),
    }
  );
  revalidateTag("post");
  return await response.json();
}
