import React, { useState, useEffect } from "react";
import { getPostData, getPostHTML } from "@/service/posts";
import CKEditorForm from "@/components/CKEditorForm";
import { getPost, getSupportData } from "./actions";
import { getUserSelect } from "../../write/actions";

type Props = {
  params: {
    slug: string;
  };
};

export default async function UpdatePage({ params: { slug } }: Props) {
  const { post, postHTML, fileName } = await getPost(slug);
  const { supportData } = await getSupportData(slug);
  const { nicknames } = await getUserSelect();
  return (
    <CKEditorForm
      post={post}
      postHTML={postHTML}
      fileName={fileName as string}
      postId={slug}
      supportData={supportData}
      nicknames={nicknames}
    />
  );
}
