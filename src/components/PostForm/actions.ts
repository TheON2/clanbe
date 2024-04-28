'use server'

import { revalidateTag } from "next/cache";

export async function submitPost(postData: any) {
  //console.log(postData)
     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
     });
    revalidateTag('post');
    return await response.json()
}