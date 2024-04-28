import { Button, Card, CardHeader, Textarea, User } from "@nextui-org/react";
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
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

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

  const handleUpdate = async () => {
    try {
      await updateComment({
        postid,
        commentid,
        author,
        editedText,
      });
      setEditMode(false);
      //router.push(`/post/read/${postid}/${category}`);
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  return (
    <div className="m-4 max-w-[700px] ">
      <Card className="">
        <CardHeader className="justify-between">
          <UserProfile email={author} />
          {editMode ? (
            <div className="hidden md:flex gap-2">
              <Button
                color="success"
                size="sm"
                variant="ghost"
                onClick={handleUpdate}
              >
                저장
              </Button>
              <Button
                color="danger"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditMode(false);
                  setEditedText(text);
                }}
              >
                취소
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button
                color="primary"
                size="sm"
                variant="ghost"
                onClick={() => setEditMode(true)}
              >
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
          )}
        </CardHeader>
        {/* <div className="pl-4 text-sm">{date}</div> */}
        <Card
          className="flex-1 p-2 m-2 overflow-hidden"
          style={{ maxWidth: "700px", overflowWrap: "break-word" }}
        >
          {editMode ? (
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              fullWidth
              autoFocus
            />
          ) : (
            text
          )}
        </Card>
      </Card>
      {editMode ? (
        <div className="block md:hidden flex gap-2">
          <Button
            color="success"
            size="sm"
            variant="ghost"
            onClick={handleUpdate}
          >
            저장
          </Button>
          <Button
            color="danger"
            size="sm"
            variant="ghost"
            onClick={() => {
              setEditMode(false);
              setEditedText(text);
            }}
          >
            취소
          </Button>
        </div>
      ) : (
        <div className="block md:hidden flex gap-2">
          <Button
            color="primary"
            size="sm"
            variant="ghost"
            onClick={() => setEditMode(true)}
          >
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
      )}
    </div>
  );
}
