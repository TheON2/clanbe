"use client";

import AdjacentPostCard from "@/components/AdjacentPostCard";
import CKEditorContent from "@/components/CKEditorContent";
import TextModal from "@/components/TextModal";
import { Post } from "@/service/posts";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubmitModal from "../SubmitModal";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import {
  CardFooter,
  User,
  Link as MyLink,
  Divider,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import CommentCard from "../CommentCard";
import ReplyCard from "../ReplyCard";
import { Comment } from "../../../types/types";
import CommentComponent from "../CommentComponent";
import ProfileCard from "../ProfileCard";
import { useSession } from "next-auth/react";
import ReplyComponent from "../ReplyComponent";

type PostFormProps = {
  post: {
    title: string;
    category: string;
    fileUrl: string;
    comments: Comment[];
    next: Post | null;
    prev: Post | null;
    _id: string;
  };
};

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { title, category, fileUrl, next, prev, _id } = post;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleCommentClick = (commentId: any) => {
    // 이미 활성화된 댓글을 다시 클릭하면 비활성화합니다.
    if (activeCommentId === commentId) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(commentId); // 활성화된 댓글 ID 설정
    }
  };
  const handleSubmit = async () => {
    try {
      const fileNameWithExtension = post.fileUrl.split("/").pop() as string;
      const fileName = fileNameWithExtension.replace(".html", "");
      const postData = {
        fileName,
        _id,
      };

      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
      });
      setIsSubmit(true);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  const triggerDelete = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isDeleting) {
      handleSubmit();
    }
  }, [isDeleting]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!post) {
    // Optionally, return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!mounted) return null;

  return (
    <div>
      <Card className="py-4 m-4">
        <CardHeader className="m-4 pb-0 pt-2 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>2024.04.14 오후 4시 13분</p>
            <div className="flex gap-4 mt-2">
              <Chip color="default">{category}</Chip>
            </div>
          </div>
          <div className="flex gap-2 mr-8">
            <Link href={`/post/update/${_id}`}>
              <h1>수정</h1>
            </Link>
            <Link href={``}>
              <TextModal
                title={"삭제"}
                text={"삭제 하시겠습니까?"}
                action={triggerDelete}
              ></TextModal>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <CKEditorContent contentUrl={fileUrl} />
        </CardBody>
        <CardFooter>
          <ProfileCard />
        </CardFooter>
      </Card>
      <Card className="my-4 mx-4 p-4 min-h-[300px]">
        <p>
          {post.comments.length > 0
            ? `${post.comments.length}개의 댓글`
            : "댓글 없음"}
        </p>
        {post.comments.length > 0 &&
          post.comments.map((cmt) => (
            <div key={cmt._id}>
              <div onClick={() => handleCommentClick(cmt._id)}>
                <CommentCard
                  commentid={cmt._id}
                  postid={post._id}
                  author={cmt.author}
                  text={cmt.text}
                  date={cmt.createdAt}
                />
                {cmt.replies &&
                  cmt.replies.map((reply) => (
                    <ReplyCard
                      key={reply._id}
                      author={reply.author}
                      text={reply.text}
                      date={reply.createdAt}
                      commentid={cmt._id}
                      replyid={reply._id}
                      postid={_id}
                    />
                  ))}
              </div>
              {activeCommentId === cmt._id && (
                <ReplyComponent postid={post._id} commentid={cmt._id} />
              )}
            </div>
          ))}
        <CommentComponent postid={_id} author={user?.email} />
      </Card>
      <SubmitModal
        title={"삭제완료"}
        text={"삭제가 완료되었습니다."}
        isOpen={isSubmit}
        onClose={() => (window.location.href = `/COMMUNITY/allposts`)}
      />
    </div>
  );
}
