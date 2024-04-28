"use server";

import { revalidateTag } from "next/cache";

type deleteCommentProps = {
  postid: string;
  commentid: string;
  replyid: string;
};

type updateCommentProps = {
  postid: string;
  author: string | null | undefined;
  editedText: string;
  commentid: string;
  replyid: string;
};

export async function deleteReply({
  postid,
  commentid,
  replyid,
}: deleteCommentProps) {
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

export async function updateReply({
  postid,
  commentid,
  author,
  editedText,
  replyid,
}: updateCommentProps) {
  console.log(postid, commentid, author, editedText, replyid);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/reply/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postData: { postid, author, editedText, commentid, replyid },
      }),
    }
  );
  revalidateTag("post");
  //return await response.json();
}
