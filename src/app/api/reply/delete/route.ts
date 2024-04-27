import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { postid, commentid, replyid } = body;

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    const post = await PostModel.findById(postid);
    if (!post) {
      return new Response(JSON.stringify({ message: "게시글이 없습니다" }), {
        status: 404,
      });
    }

    const comment = post.comments.id(commentid);
    if (!comment) {
      return new Response(JSON.stringify({ message: "댓글이 없습니다" }), {
        status: 404,
      });
    }

    const replyIndex = comment.replies.findIndex((r:any) => r._id.toString() === replyid);
    if (replyIndex === -1) {
      return new Response(JSON.stringify({ message: "대댓글이 없습니다" }), {
        status: 404,
      });
    }

    comment.replies.splice(replyIndex, 1); // 배열에서 대댓글 제거
    await post.save(); // 변경사항 저장

    console.log("대댓글 삭제 성공");
    return new Response(JSON.stringify({ message: "대댓글 삭제 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("오류 발생", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
