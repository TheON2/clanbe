import { Button, ButtonGroup, Card, CardHeader, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { Server } from "../../public/Icons";
import { Image } from "@nextui-org/react";
import UserProfile from "./UserProfile";

type CommentCardProps = {
  author: string;
  text: string;
  date: Date;
};

export default function ReplyCard({ author, text, date }: CommentCardProps) {
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
            <Button color="danger" size="sm" variant="ghost">
              삭제
            </Button>
          </div>
        </CardHeader>
        <div className="pl-4 text-sm">{date}</div>
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
        <Button color="danger" size="sm" variant="ghost">
          삭제
        </Button>
      </div>
    </div>
  );
}
