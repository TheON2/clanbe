"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function IntroDucePage() {
  return (
    <BoardLayout boardTitle={"가입 인사"} announce={announce} posts={board} />
  );
}
