import {
  Button,
  Card,
  Divider,
  Input,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { useState } from "react";
import UserProfile from "./UserProfile";

type CommentFormProps = {
  postid: string;
  author: string | null | undefined;
};

export default function CommentComponent({ postid, author }: CommentFormProps) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const postData = {
        postid,
        author,
        text,
      };

      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setText(""); // 성공한 후 텍스트 필드 초기화
      setIsSubmit(true);
      // window.location.href = `/posts/${postid}`;  // Optional: Redirect to post page
    } catch (error) {
      console.error("Failed to submit the comment:", error);
    }
  };

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleCancel = () => {
    setText(""); // 취소 버튼 클릭 시 텍스트 필드 초기화
  };
  return (
    <Card className="p-4 flex flex-nowrap w-full">
      {/* <div className="flex items-center p-4">
        <User
          name="Junior Garcia"
          description={
            <MyLink href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @jrgarciadev
            </MyLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
      </div> */}
      <UserProfile email={author} />
      <div className="flex-1  w-full min-h-[200px]">
        <Textarea
          value={text}
          minRows={7}
          maxRows={7}
          onChange={handleTextChange}
        ></Textarea>
      </div>
      <div className="flex mt-4">
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button color="danger" size="sm" variant="ghost" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </Card>
  );
}