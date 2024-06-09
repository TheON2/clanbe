"use client";

import CKEditorContent from "@/components/CKEditorContent";
import TextModal from "@/components/TextModal";
import { Post } from "@/service/posts";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import {
  CardFooter,
  User,
  Link as MyLink,
  Divider,
  Button,
  Tooltip,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import CommentCard from "./CommentCard/CommentCard";
import ReplyCard from "./ReplyCard";
import { Comment, User as MyUser, SupportAmount } from "../../types/types";
import CommentComponent from "./CommentComponent";
import ProfileCard from "./ProfileCard";
import { useSession } from "next-auth/react";
import ReplyComponent from "./ReplyComponent";
import { formatDate } from "@/utils/dateUtils";
import { EditIcon } from "../../public/EditIcon";
import { categoryLabels, getCategoryPath } from "../../public/data";
import { tearUpdate } from "@/service/user";

type PostFormProps = {
  post: {
    title: string;
    category: string;
    fileUrl: string;
    author: string;
    comments: Comment[];
    next: Post | null;
    prev: Post | null;
    _id: string;
    createdAt: Date;
  };
  userData: any;
  supportData: SupportAmount;
};

const tiers = ["S+", "S", "A+", "A", "B+", "B", "C", "D"];

export default function PostForm({
  post,
  userData,
  supportData,
}: PostFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { title, category, fileUrl, next, prev, _id } = post;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [tear, setTear] = useState("");
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

      const response = await fetch("/api/post/delete", {
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

  // const handleUpdateTear = async () => {
  //   try {
  //     const response = await tearUpdate(user.nickname, tear);

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update the tear:", error);
  //   }
  // };

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

  useEffect(() => {
    // 세션 상태가 'authenticated'이고 user 객체가 존재할 때만 함수를 실행
    if (status === "authenticated" && user) {
      const viewCount = async () => {
        await fetch(`/api/view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            viewData: {
              postid: post._id,
              userid: user._id,
            },
          }),
        });
      };
      viewCount();
    }
  }, []);

  if (!post) {
    // Optionally, return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!mounted) return null;

  return (
    <div>
      <Card className="py-4 m-4">
        <CardHeader className="m-4 pb-0 pt-2 px-4 flex items-center">
          <div>
            <h1 className="md:text-4xl font-bold">{title}</h1>
            <p className="pt-4 pb-4">{formatDate(post.createdAt)}</p>
            <div className="flex gap-2">
              <Button
                className="h-[30px] m-2 mr-4"
                radius="full"
                color="primary"
                variant="ghost"
                onClick={() => {
                  const path = getCategoryPath(categoryLabels[category]);
                  router.push(`${path}`);
                }}
              >
                {categoryLabels[category]}
              </Button>
              {user?.email === post.author && (
                <div className="flex gap-2">
                  <Link href={`/post/update/${_id}`}>
                    <Tooltip content="Update Post">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() =>
                          router.push(`/user/profile/${user.email}`)
                        }
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                  </Link>
                  <Link href={``}>
                    <TextModal
                      title={"삭제"}
                      text={"삭제 하시겠습니까?"}
                      action={triggerDelete}
                    ></TextModal>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {category === "support" && supportData?.type === 1 && (
            <Card className="mx-4 h-[100px] flex items-center justify-center">
              <p className="font-bold text-2xl">
                {supportData.email}님께서 클랜을 위해
              </p>
              <p className="font-bold text-2xl">
                {supportData.amount}원을 후원하셨습니다.
              </p>
            </Card>
          )}
          {category === "support" && supportData?.type === 2 && (
            <Card className="mx-4 h-[100px] flex items-center justify-center">
              <p className="font-bold text-2xl">
                {supportData.email}님께서 클랜활동을 위해
              </p>
              <p className="font-bold text-2xl">
                {supportData.amount}원을 지출하셨습니다.
              </p>
            </Card>
          )}
          {category === "beforetear" && user && user.grade >= 4 && (
            <Card className="mx-4 h-[200px] flex items-center justify-center">
              <p className="font-bold text-2xl">티어배정을 확정하시겠습니까?</p>
              <Select
                aria-label="tear"
                value={tear}
                className="w-[100px] mt-2"
                onChange={(e) => {
                  setTear(e.target.value);
                }}
              >
                {tiers.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
                  </SelectItem>
                ))}
              </Select>
              <Button className="mt-2" color="primary">
                확정
              </Button>
            </Card>
          )}
          <CKEditorContent contentUrl={fileUrl} />
        </CardBody>
        <CardFooter>
          <ProfileCard userData={userData} />
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
                  category={category}
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
        <CommentComponent
          postid={_id}
          author={user?.email}
          category={category}
        />
      </Card>
      <SubmitModal
        title={"삭제완료"}
        text={"삭제가 완료되었습니다."}
        isOpen={isSubmit}
        onClose={() => (window.location.href = `/community/allposts`)}
      />
    </div>
  );
}
