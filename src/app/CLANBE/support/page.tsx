"use client";

import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function SupportPage() {
  return (
    <BoardLayout boardTitle={"클랜 후원"} announce={announce} posts={board} />
  );
}
