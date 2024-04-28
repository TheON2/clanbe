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
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

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

  const handleUpdate = async () => {
    try {
      await updateReply({
        postid,
        commentid,
        author,
        editedText,
        replyid,
      });
      setEditMode(false);
      //router.push(`/post/read/${postid}/${category}`);
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  return (
    <div className="m-4 ml-24 max-w-[700px] ">
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
