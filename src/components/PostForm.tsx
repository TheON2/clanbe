"use client";

import AdjacentPostCard from "@/components/AdjacentPostCard";
import CKEditorContent from "@/components/CKEditorContent";
import TextModal from "@/components/TextModal";
import { Post } from "@/service/posts";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import {
  CardFooter,
  User,
  Link as MyLink,
  Divider,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import CommentCard from "./CommentCard";
import ReplyCard from "./ReplyCard";
import { Comment } from "../../types/types";
import CommentComponent from "./CommentComponent";
import ProfileCard from "./ProfileCard";

type PostFormProps = {
  post: {
    title: string;
    category: string;
    fileUrl: string;
    comment: Comment[];
    next: Post | null;
    prev: Post | null;
    _id: string;
  };
};

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { title, category, fileUrl, next, prev, _id } = post;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = async () => {
    try {
      const fileNameWithExtension = post.fileUrl.split("/").pop() as string;
      const fileName = fileNameWithExtension.replace(".html", "");
      const postData = {
        fileName,
        _id,
      };

      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
      });
      setIsSubmit(true);
      revalidateTag("post");
      //   window.location.href = `/posts`;

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  const triggerDelete = () => {
    setIsDeleting(true);
  };
  useEffect(() => {
    if (isDeleting) {
      handleSubmit();
    }
  }, [isDeleting]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!post) {
    // Optionally, return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!mounted) return null;

  return (
    <div>
      <Card className="py-4 m-4">
        <CardHeader className="m-4 pb-0 pt-2 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex gap-4 mt-2">
              <Chip color="default">{category}</Chip>
            </div>
          </div>
          <div className="flex gap-2 mr-8">
            <Link href={`/post/update/${_id}`}>
              <h1>수정</h1>
            </Link>
            <Link href={``}>
              <TextModal
                title={"삭제"}
                text={"삭제 하시겠습니까?"}
                action={triggerDelete}
              ></TextModal>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <CKEditorContent contentUrl={fileUrl} />
        </CardBody>
        <CardFooter>
          <ProfileCard />
        </CardFooter>
      </Card>
      <Card className="my-4 mx-4 p-4 min-h-[300px]">
        <p>댓글 1개</p>
        <CommentCard />
        <ReplyCard />
        <CommentCard />
        <CommentCard />
        <CommentComponent />
      </Card>
      <SubmitModal
        title={"삭제완료"}
        text={"삭제가 완료되었습니다."}
        isOpen={isSubmit}
        onClose={() => router.push("/COMMUNITY/allposts")}
      />
    </div>
  );
}
