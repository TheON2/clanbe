"use server";

import { revalidateTag } from "next/cache";

export async function resultPointGame(nickname: string, point: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/point/game`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, point }),
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send point. Status: " + response.status);
    }
    revalidateTag("user");
    return await response.json();
  } catch (error) {
    console.error("Error send point:", error);
    return null;
  }
}
