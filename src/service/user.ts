import mongoose from "mongoose";
import TeamModel from "@/models/team";
import UserModel from "@/models/user";
import { Team, User } from "../../types/types";
import { Document } from "mongoose";
import { revalidateTag } from "next/cache";

type updateProfile = {
  email: string;
  password: string;
  nickname: string;
  race: string;
  avatar: string;
};


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

export async function getUserProfile(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/userprofile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: decodeURIComponent(slug) }),
      next: { tags: ["user"] },
      cache: "no-store",
    }
  );
  return await response.json();
}


export async function getNavData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/nav`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { tags: ["user"] },
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
};

export async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    next: { tags: ["user"] },
  });
  //revalidateTag("user");
  return await response.json();
}

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