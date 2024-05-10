import {
  Button,
  Card,
  Divider,
  Input,
  Link,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { useState } from "react";
import UserProfile from "./UserProfile";
import { createComment } from "../service/comment";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type CommentFormProps = {
  postid: string;
  author: string | null | undefined;
  category: string;
};

export default function CommentComponent({
  postid,
  author,
  category,
}: CommentFormProps) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const response = await createComment({ postid, author, text });

      if (!response) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setText(""); // 성공한 후 텍스트 필드 초기화
      setIsSubmit(true);
      // router.push(`/post/read/${postid}/${category}`);
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

  if (!isLoggedIn) {
    return (
      <Card className="p-4 flex flex-col items-center justify-center w-full h-32">
        <p>권한이 없습니다. 로그인을 해주세요.</p>
        <Link href="/api/auth/signin">
          <Button color="primary" size="sm">
            로그인
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex flex-nowrap w-full">
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
