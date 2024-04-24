import mongoose from "mongoose";

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  replies: [
    {
      author: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 게시물 스키마에 댓글 스키마를 임베디드
const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    thumbnail: String,
    featured: Boolean,
    fileUrl: String,
    author: String,
    view: Number,
    comments: [commentSchema], // 댓글 배열 추가
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.models.post || mongoose.model("post", postSchema);

export default PostModel;
