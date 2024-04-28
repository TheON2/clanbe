import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { postid, commentid, replyid, editedText } = body.postData;

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

    const reply = comment.replies.id(replyid);
    if (!reply) {
      return new Response(JSON.stringify({ message: "대댓글이 없습니다" }), {
        status: 404,
      });
    }

    reply.text = editedText;
    await post.save(); // 변경사항 저장

    console.log("대댓글 수정 성공");
    return new Response(JSON.stringify({ message: "대댓글 수정 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("오류 발생", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "An unknown error occurred" }),
        {
          status: 500,
        }
      );
    }
  }
}
