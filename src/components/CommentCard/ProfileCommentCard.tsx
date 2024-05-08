import {
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import UserProfile from "../UserProfile";
import { useSession } from "next-auth/react";
import CommentComponent from "../CommentComponent/CommentComponent";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
import SubmitModal from "../SubmitModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteComment, updateComment } from "./actions";
import { formatDate } from "@/utils/dateUtils";
import { categoryLabels } from "../../../public/data";

type CommentCardProps = {
  commentid: string;
  author: string;
  text: string;
  postid: string;
  date: Date;
  category: string;
  postTitle: string;
};

export default function PostCommentCard({
  author,
  text,
  date,
  postid,
  commentid,
  category,
  postTitle,
}: CommentCardProps) {
  const labels = categoryLabels;

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "공지사항":
        return "/CLANBE/notices";
      case "클랜 후원":
        return "/CLANBE/support";
      case "자유게시판":
        return "/COMMUNITY/forum";
      case "가입인사":
        return "/COMMUNITY/introduce";
      case "건의사항":
        return "/COMMUNITY/feedback";
      case "전략전술":
        return "/COMMUNITY/tactics";
      case "출석체크":
        return "/COMMUNITY/dailycheckin";
      case "랭킹전":
        return "/LEAGUE/ranking";
      case "이벤트":
        return "/LEAGUE/event";
      case "외부리그":
        return "/LEAGUE/opponent";
      case "끝장전":
        return "/LEAGUE/versus";
      default:
        return "/"; // 기본 경로
    }
  };

  const router = useRouter();

  return (
    <div className="m-4 max-w-[700px]">
      <Card>
        <div className="flex gap-2 m-2">
          <Chip color="primary">{categoryLabels[category]}</Chip>
          <p>{postTitle}</p>
        </div>
        <Divider />
        <CardHeader className="justify-between">
          <UserProfile email={author} />
          <div className="flex gap-2">
            <Button
              color="success"
              size="sm"
              variant="ghost"
              onClick={() => router.push(`/post/read/${postid}/${category}`)}
            >
              이동
            </Button>
          </div>
        </CardHeader>
        <div className="ml-4">{formatDate(date)}</div>
        <Card
          className="flex-1 p-2 m-2 overflow-hidden"
          style={{ maxWidth: "700px", overflowWrap: "break-word" }}
        >
          {text}
        </Card>
      </Card>
    </div>
  );
}
