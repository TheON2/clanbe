"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { marked } from "marked";
import { PostData } from "@/service/posts";
import {
  Card,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";
import ButtonModal from "./ButtonModal";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";

const MyEditorWithNoSSR = dynamic(() => import("../app/MyEditor/MyEditor"), {
  ssr: false,
});

export default function CKEditorForm({
  post,
  postHTML,
  fileName,
  postId,
}: {
  post: PostData;
  postHTML: string;
  fileName: string;
  postId: string;
}) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  console.log(post);
  console.log(postHTML);

  useEffect(() => {
    setEditorData(postHTML);
    setTitle(post.title);
    setCategory(post.category);
    setFeatured(post.featured);
    setThumbnail(post.thumbnail);
  }, [postHTML, post]);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setEditorData(newData);
    const parser = new DOMParser();
    const doc = parser.parseFromString(newData, "text/html");
    const firstImage = doc.querySelector("img");
    console.log(firstImage);
    if (firstImage && firstImage.src) {
      setThumbnail(firstImage.src);
    }
    if (doc && doc.body.textContent) {
      setDescription(doc.body.textContent.trim().substring(0, 40));
    }
  };

  const handleSubmit = async () => {
    try {
      const postData = {
        htmlContent: editorData,
        title,
        description,
        category,
        thumbnail,
        featured,
        fileName,
        postId,
      };

      console.log("썸네일" + thumbnail);
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
      });
      setIsSubmit(true);
      //window.location.href = `/posts/${response.statusText}`;

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  const htmlContent = marked(editorData);

  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <Card className="flex flex-1 flex-col w-full lg:w-auto lg:max-w-[500px]">
        <CardHeader>글 수정하기</CardHeader>
        <div className="">
          <div className="flex flex-wrap gap-4 p-4">
            <Input
              size="sm"
              type="email"
              label="제목"
              value={title}
              onChange={handleTitleChange}
            />
            <Select
              label="게시판 선택"
              placeholder="Select an animal"
              className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
              onChange={(e) => handleCategoryChange(e)} // onChange 이벤트 핸들러 추가
            >
              <SelectSection
                title="CLANBE"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="support">클랜후원</SelectItem>
              </SelectSection>
              <SelectSection
                title="커뮤니티"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="allposts">자유게시판</SelectItem>
                <SelectItem key="introduce">가입인사</SelectItem>
                <SelectItem key="feedback">건의사항</SelectItem>
                <SelectItem key="tactics">전략전술</SelectItem>
                <SelectItem key="dailycheckin">출석체크</SelectItem>
              </SelectSection>
              <SelectSection
                title="리그"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="ranking">랭킹전</SelectItem>
                <SelectItem key="event">이벤트</SelectItem>
                <SelectItem key="opponent">외부리그</SelectItem>
                <SelectItem key="versus">끝장전</SelectItem>
              </SelectSection>
            </Select>
            <Checkbox
              className="my-4"
              size="md"
              onChange={(e) => setFeatured(e.target.checked)}
            >
              비밀글
            </Checkbox>
            <ButtonModal
              title={"수정하기"}
              text={"글을 수정하시겠습니까?"}
              action={handleSubmit}
            />
            <SubmitModal
              title={"수정완료"}
              text={"수정이 완료되었습니다."}
              isOpen={isSubmit}
              onClose={() => (window.location.href = `/post/read/${postId}`)}
            />
          </div>
        </div>
        {/* 글쓰기 에디터 섹션 */}
        <div className="overflow-y-auto h-[590px]">
          <MyEditorWithNoSSR data={editorData} onChange={handleEditorChange} />
        </div>
      </Card>
      <div className="hidden lg:block md:flex-1 overflow-y-auto h-[800px] max-w-[500px]">
        <div className="flex gap-4"></div>
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold pl-4 pt-4">
              {title.length > 0 ? title : "미리보기 페이지"}
            </h1>
          </CardHeader>
          <div className="px-4">
            {category.length >= 1 ? (
              <Chip className="my-4" color="default">
                {category}
              </Chip>
            ) : (
              <Chip className="my-4" color="default">
                카테고리
              </Chip>
            )}
          </div>
          <div
            className="ck-content p-8 break-words"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </Card>
      </div>
    </div>
  );
}
