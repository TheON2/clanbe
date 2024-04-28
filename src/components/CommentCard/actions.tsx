"use server";

import { revalidateTag } from "next/cache";

type deleteCommentProps = {
  postid: string;
  commentid: string;
};

type updateCommentProps = {
  postid: string;
  author: string | null | undefined;
  editedText: string;
  commentid: string;
};

export async function deleteComment({ postid, commentid }: deleteCommentProps) {
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

export async function updateComment({
  postid,
  commentid,
  author,
  editedText,
}: updateCommentProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/comment/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postData: { postid, author, editedText, commentid },
      }),
    }
  );
  revalidateTag("post");
  //return await response.json();
}
