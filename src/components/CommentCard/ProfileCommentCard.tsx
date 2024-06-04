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
