import { Button, Card, CardHeader, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import UserProfile from "../UserProfile";
import { useSession } from "next-auth/react";
import CommentComponent from "../CommentComponent/CommentComponent";
import ReplyComponent from "../ReplyComponent";
import SubmitModal from "../SubmitModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteComment } from "./actions";

type CommentCardProps = {
  commentid: string;
  author: string;
  text: string;
  postid: string;
  date: Date;
  category: string;
};

export default function CommentCard({
  author,
  text,
  date,
  postid,
  commentid,
  category,
}: CommentCardProps) {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteComment({ postid, commentid });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      router.push(`/post/read/${postid}/${category}`);
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  return (
    <div className="m-4 max-w-[700px] ">
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
