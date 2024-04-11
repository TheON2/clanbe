"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function DailyCheckInPage() {
  return (
    <BoardLayout boardTitle={"출석 체크"} announce={announce} posts={board} />
  );
}
