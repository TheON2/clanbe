"use server";

import { Match } from "../../types/types";

export async function createMatch(matchData: Match) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/match/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchData }),
      next: { tags: ["match"] },
      cache: "no-store",
    }
  );

  const result = await response.json();
  return result;
}
