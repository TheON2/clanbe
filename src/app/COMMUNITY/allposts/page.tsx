"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function AllPostPage() {
  return (
    <BoardLayout boardTitle={"전체 게시글"} announce={announce} posts={board} />
  );
}
