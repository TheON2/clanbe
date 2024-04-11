"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function ForumPage() {
  return (
    <BoardLayout boardTitle={"자유 게시판"} announce={announce} posts={board} />
  );
}
