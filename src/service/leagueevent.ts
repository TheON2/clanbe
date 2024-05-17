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
        next: { tags: ["leagueevent"] },
        cache: "no-store",
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

export async function updateLeagueEvent(newEvent: LeagueEvent) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/leagueevent/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
        next: { tags: ["leagueevent"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update event. Status: " + response.status);
    }
    revalidateTag("leagueevent");
    return await response.json();
  } catch (error) {
    console.error("Error update event:", error);
    return null;
  }
}

export async function deleteLeagueEvent(deleteId:string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/leagueevent/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteId),
        next: { tags: ["leagueevent"] },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete event. Status: " + response.status);
    }
    revalidateTag("leagueevent");
    return await response.json();
  } catch (error) {
    console.error("Error delete event:", error);
    return null;
  }
}

export async function getLeagueEvent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/leagueevent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["leagueevent"] },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch event. Status: " + response.status);
    }
    revalidateTag("leagueevent");
    return await response.json();
  } catch (error) {
    console.error("Error fetch event:", error);
    return null;
  }
}
