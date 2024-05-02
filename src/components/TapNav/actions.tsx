"use server";

import { revalidateTag } from "next/cache";

export async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  revalidateTag("user");
  return await response.json();
}
