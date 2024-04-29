"use server";

import { revalidateTag } from "next/cache";

export async function getEvent() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["schedule"] },
    cache: "no-store",
  });

  // 응답을 JSON으로 변환
  const schedule = await response.json();

  return schedule;
}
