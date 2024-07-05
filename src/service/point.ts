// src/server/actions.ts
"use server";

import { revalidateTag } from "next/cache";
import { Point } from "../../types/types";

export async function sendPoint(newPointData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/point/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPointData),
        next: { tags: ["point"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send point. Status: " + response.status);
    }
    revalidateTag("point");
    return await response.json();
  } catch (error) {
    console.error("Error send point:", error);
    return null;
  }
}

export async function getDailyPoint(userNickName: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/point/daily`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userNickName),
        next: { tags: ["point"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get daily point. Status: " + response.status);
    }
    revalidateTag("point");
    return await response.json();
  } catch (error) {
    console.error("Error get daily point:", error);
    return null;
  }
}

export async function getPointData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/point`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["point"] },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch pointData. Status: " + response.status);
    }
    revalidateTag("point");
    return await response.json();
  } catch (error) {
    console.error("Error fetch pointData:", error);
    return null;
  }
}
