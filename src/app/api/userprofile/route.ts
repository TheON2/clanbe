import UserModel from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import PostModel from "@/models/post";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  let { email } = body;

  try {
    // 이미 연결된 경우 재연결하지 않도록 확인합니다.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    }

    const existingUser = await UserModel.findOne({ email: email }).select(
      "-password"
    );


    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 유저입니다." }),
        {
          status: 409,
        }
      );
    }

     // 유저의 게시글 조회
    const userPosts = await PostModel.find({ author: email });

    // 특정 사용자의 코멘트와 답글을 포함하는 모든 게시글 조회
    const posts = await PostModel.find({
      $or: [
        { 'comments.author': email },
        { 'comments.replies.author': email }
      ]
    });

    // 결과 데이터 추출
    let combinedResults:any = [];

     posts.forEach(post => {
      post.comments.forEach((comment:any) => {
        if (comment.author === email) {
          combinedResults.push({
            ...comment.toObject(),
            postId: post._id,  // 부모 게시글의 ID 추가
            category: post.category,
            postTitle:post.title
          });
        }
        comment.replies.forEach((reply:any) => {
          if (reply.author === email) {
            combinedResults.push({
              ...reply.toObject(),
              postId: post._id,  // 부모 게시글의 ID 추가
              category: post.category,
              postTitle:post.title
            });
          }
        });
      });
    });

    return new Response(JSON.stringify({ user:existingUser,posts:userPosts,comments:combinedResults }), {
      status: 200,
    });
  } catch (error) {
    // 에러 처리 로직
    return new Response(JSON.stringify({ message: "조회 실패" }), {
      status: 500,
    });
  }
}
