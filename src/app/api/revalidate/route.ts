import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  console.log(tag)

  // tag가 null이 아닐 때만 revalidateTag 호출
  if (tag !== null) {
    revalidateTag(tag);
    return new Response(JSON.stringify({ revalidated: true, now: Date.now() }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    // tag가 null인 경우, 오류 메시지를 반환
    return new Response(JSON.stringify({ error: "Tag is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
