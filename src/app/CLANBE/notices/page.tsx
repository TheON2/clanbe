"use client";

import Notice2 from "@/components/Notice2";
import BoardLayout from "@/components/BoardLayout";
import { announce, board } from "../../../../public/data";

export default function NoticesPage() {
  return (
    <>
      <div className="hidden custom:block w-full">
        <Notice2 />
      </div>
      <div className="block custom:hidden w-full">
        <BoardLayout
          boardTitle={"공지사항"}
          announce={announce}
          posts={board}
        />
      </div>
    </>
  );
}
