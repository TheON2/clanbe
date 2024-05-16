// src/server/actions.ts
"use server";

import { revalidateTag } from "next/cache";
import { LeagueEvent } from "../../types/types";

export async function createLeagueEvent(newEvent: LeagueEvent) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/leagueevent/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create event. Status: " + response.status);
    }
    revalidateTag("leagueevent");
    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
}
