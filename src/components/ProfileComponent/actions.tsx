"use server";

import { revalidateTag } from "next/cache";

type updateProfile = {
  email: string;
  password: string;
  nickname: string;
  race: string;
  avatar: string;
};

export async function updateProfile(updateState: updateProfile) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateState }),
      next: { tags: ["user"] },
    }
  );
  revalidateTag("user");
  return await response.json();
}

export async function getProfile(author: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: author }),
    next: { tags: ["user"] },
  });
  return await response.json();
}
