import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { Server } from "../../../public/Icons";
import { Image } from "@nextui-org/react";
import UserProfile from "../UserProfile";
import { deleteReply, updateReply } from "./actions";
import { useState } from "react";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleDelete = async () => {
    try {
      const response = await deleteReply({ postid, commentid, replyid });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to delete the reply:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateReply({
        postid,
        commentid,
        replyid,
        author,
        editedText,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update the reply:", error);
    }
  };

  const isAuthor = user?.email === author;
  const cardStyle = isAuthor
    ? { border: "1px solid #0070f3", boxShadow: "0 2px 6px #0070f350" }
    : {};

  return (
    <div className="m-4 ml-24 max-w-[700px]">
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
