import { Button, ButtonGroup, Card, CardHeader, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { Server } from "../../../public/Icons";
import { Image } from "@nextui-org/react";
import UserProfile from "../UserProfile";
import { deleteReply } from "./actions";

type CommentCardProps = {
  commentid: string;
  replyid: string;
  author: string;
  text: string;
  postid: string;
  date: Date;
};

export default function ReplyCard({
  author,
  text,
  date,
  postid,
  commentid,
  replyid,
}: CommentCardProps) {
  const handleDelete = async () => {
    try {
      const response = await deleteReply({ postid, commentid, replyid });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  return (
    <div className="m-4 ml-24 max-w-[700px] ">
      <Card className="">
        <CardHeader className="justify-between">
          <UserProfile email={author} />
          <div className="hidden md:block flex gap-4">
            {/* 이 부분에 ml-auto를 추가하여 우측 정렬 */}
            <Button color="primary" size="sm" variant="ghost">
              수정
            </Button>
            <Button
              color="danger"
              size="sm"
              variant="ghost"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        </CardHeader>
        {/* <div className="pl-4 text-sm">{date}</div> */}
        <Card
          className="flex-1 p-2 m-2 overflow-hidden"
          style={{ maxWidth: "700px", overflowWrap: "break-word" }}
        >
          {text}
        </Card>
      </Card>
      <div className="block md:hidden flex gap-2 m-2">
        {/* 이 부분에 ml-auto를 추가하여 우측 정렬 */}
        <Button color="primary" size="sm" variant="ghost">
          수정
        </Button>
        <Button color="danger" size="sm" variant="ghost" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </div>
  );
}
