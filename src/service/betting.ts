// src/server/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function createBetting(newBettingData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newBettingData }),
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

export async function updateStatusBetting(bettingId: string, status: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bettingId, status }),
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

export async function updateBetting(
  nickname: string,
  point: number,
  bettingId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/update`,
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

export async function cancelBetting(
  nickname: string,
  choice: string,
  bettingId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/update`,
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

export async function deleteBetting(bettingId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bettingId),
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

export async function resultBetting(bettingId: string, winner: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/betting/result`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bettingId, winner }),
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

export async function getBettingData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/betting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["betting"] },
    });
    if (!response.ok) {
      throw new Error(
        "Failed to fetch bettingData. Status: " + response.status
      );
    }
    revalidateTag("betting");
    return await response.json();
  } catch (error) {
    console.error("Error fetch bettingData:", error);
    return null;
  }
}
