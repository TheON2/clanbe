"use server";

import { revalidateTag } from "next/cache";

type createCommentProps = {
  postid: string;
  author: string|null|undefined;
  text: string;
  commentid: string;
};

export async function createReply({
  postid,
  commentid,
  author,
  text,
}: createCommentProps) {
   await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/reply/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postData: { postid, author, text, commentid } }),
    }
  );
  revalidateTag("post");
}
