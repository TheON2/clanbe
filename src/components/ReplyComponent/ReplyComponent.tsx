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
import UserProfile from "../UserProfile";
import { useSession } from "next-auth/react";
import { createReply } from "./actions";

type CommentFormProps = {
  postid: string;
  commentid: string;
};

export default function ReplyComponent({
  postid,
  commentid,
}: CommentFormProps) {
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const [isSubmit, setIsSubmit] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const postData = {
        commentid,
        postid,
        text,
        author: user?.email || "",
      };

      await createReply({
        postid,
        author: user?.email || "",
        text,
        commentid,
      });

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
    <Card className="p-4 mt-4 flex flex-nowrap w-full">
      <div className="flex-1  w-full min-h-[100px]">
        <Textarea
          value={text}
          minRows={4}
          maxRows={4}
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
