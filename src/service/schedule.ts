"use server";

import { revalidateTag } from "next/cache";
import { EventType } from "../../types/types";

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


export async function createEvent(newEvent: EventType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event/create`,
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
    revalidateTag("schedule");
    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
}

export async function updateEvent(newEvent: EventType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update event. Status: " + response.status);
    }
    revalidateTag("schedule");
    return await response.json();
  } catch (error) {
    console.error("Error update event:", error);
    return null;
  }
}

export async function deleteEvent(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete event. Status: " + response.status);
    }
    revalidateTag("schedule");
    return await response.json();
  } catch (error) {
    console.error("Error delete event:", error);
    return null;
  }
}
