"use server";

export async function getSupports() {
  const category = "support";
  // 응답을 JSON으로 변환
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/support`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
    next: { tags: ["post"] },
    cache: "no-store",
  });

  const posts = await response.json();
  return posts;
}
