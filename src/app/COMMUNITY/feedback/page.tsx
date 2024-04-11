"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function FeedBackPage() {
  return (
    <BoardLayout boardTitle={"건의 사항"} announce={announce} posts={board} />
  );
}
