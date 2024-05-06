"use server";

export async function getUser(slug: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: decodeURIComponent(slug) }),
    next: { tags: ["user"] },
    cache: "no-store",
  });
  return await response.json();
}
