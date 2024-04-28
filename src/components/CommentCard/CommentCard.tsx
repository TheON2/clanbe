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
  const { data: session, status } = useSession();
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
      console.error("Failed to delete the comment:", error);
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
    } catch (error) {
      console.error("Failed to update the comment:", error);
    }
  };

  const isAuthor = user?.email === author;

  // Determine the card's border style based on authorship
  const cardStyle = isAuthor
    ? { border: "1px solid #0070f3", boxShadow: "0 2px 6px #0070f350" }
    : {};

  return (
    <div className="m-4 max-w-[700px]">
      <Card style={cardStyle}>
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
            isLoggedIn &&
            isAuthor && (
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
            )
          )}
        </CardHeader>
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
        isLoggedIn &&
        isAuthor && (
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
        )
      )}
    </div>
  );
}
