// src/server/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function createBet(newBettingData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/bet/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBettingData),
        next: { tags: ["betting"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return await response.json();
    }
    revalidateTag("betting");
    return await response.json();
  } catch (error) {
    console.error("Error send betting:", error);
    return null;
  }
}

export async function updateBet(
  nickname: string,
  point: number,
  bettingId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/bet/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, point, bettingId }),
        next: { tags: ["betting"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send betting. Status: " + response.status);
    }
    revalidateTag("betting");
    return await response.json();
  } catch (error) {
    console.error("Error send betting:", error);
    return null;
  }
}

export async function cancelBet(
  nickname: string,
  choice: string,
  bettingId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/bet/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, choice, bettingId }),
        next: { tags: ["betting"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send betting. Status: " + response.status);
    }
    revalidateTag("betting");
    return await response.json();
  } catch (error) {
    console.error("Error send betting:", error);
    return null;
  }
}
