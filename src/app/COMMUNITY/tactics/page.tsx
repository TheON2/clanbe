"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function TacticsPage() {
  return (
    <BoardLayout boardTitle={"전략/전술"} announce={announce} posts={board} />
  );
}
