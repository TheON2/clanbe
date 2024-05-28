import {
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Textarea,
  User,
} from "@nextui-org/react";
import UserProfile from "../UserProfile";
import { useRouter } from "next/navigation";
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
          return "/clanbe/notices";
        case "클랜 후원":
          return "/clanbe/support";
        case "자유게시판":
          return "/community/forum";
        case "가입인사":
          return "/community/introduce";
        case "건의사항":
          return "/community/feedback";
        case "전략전술":
          return "/community/tactics";
        case "출석체크":
          return "/community/dailycheckin";
        case "랭킹전":
          return "/league/ranking";
        case "이벤트":
          return "/league/event";
        case "외부리그":
          return "/league/opponent";
        case "끝장전":
          return "/league/versus";
        case "프로리그":
          return "/proleague/notice";
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
