"use server";

import { revalidateTag } from "next/cache";
import { EventType } from "../../types/types";

export async function getTeamData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/nav`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { tags: ["user", "team"] },
    });
    const { teams, users } = await response.json();

    // 데이터 변환 로직은 필요에 따라 조정
    return {
      users,
      teams,
    };
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
}

export async function createTeamData(formData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/team/create`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create team");
    }
    revalidateTag("team");
    return data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
}

export async function updateTeamData(formData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/team/update`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update team");
    }
    revalidateTag("team");
    return data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
}

export async function deleteTeamData(selectedTeamName: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/team/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ name: selectedTeamName }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete team");
    }
    revalidateTag("team");
    return data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
}

export async function updateUserTeam(usernickname: string, teamid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernickname, teamid }),
      next: { tags: ["user"] },
    }
  );
  revalidateTag("user");
  return await response.json();
}
