"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { marked } from "marked";
import { PostData, updatePost } from "@/service/posts";
import {
  Card,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  SelectSection,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import ButtonModal from "./ButtonModal";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SupportAmount } from "../../types/types";

const MyEditorWithNoSSR = dynamic(() => import("./MyEditor/MyEditor"), {
  ssr: false,
});

interface InitialContent {
  [key: string]: string;
}

export default function CKEditorForm({
  post,
  postHTML,
  fileName,
  postId,
  supportData,
  nicknames,
}: {
  post: PostData;
  supportData: SupportAmount;
  postHTML: string;
  fileName: string;
  postId: string;
  nicknames: string[];
}) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [featured, setFeatured] = useState(false);
  const [noticed, setNoticed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = useState(1);
  const [supporter, setSupporter] = useState("");
  const [supporterKey, setSupporterKey] = useState<any>("supporter");
  const [amount, setAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [nextCategory, setNextCategory] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    setEditorData(postHTML);
    setTitle(post.title);
    setCategory(post.category);
    setFeatured(post.featured);
    setNoticed(post.noticed);
    setThumbnail(post.thumbnail);
    if (supportData) {
      setType(supportData?.type);
      setSupporter(supportData?.email);
      setAmount(supportData?.amount);
      setSupporterKey(supportData?.email);
    }
    setIsInitialLoad(false);
  }, [
    postHTML,
    post.title,
    post.category,
    post.featured,
    post.noticed,
    post.thumbnail,
    supportData,
  ]);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    const selectedCategory = event.target.value;

    if (!isInitialLoad) {
      setNextCategory(selectedCategory);
      setModalOpen(true);
    } else {
      setCategory(selectedCategory);
    }
  };

  const applyTemplate = () => {
    setEditorData(initialContent[nextCategory] || "");
    setCategory(nextCategory);
    setModalOpen(false);
  };

  const closeModal = () => {
    setCategory(nextCategory);
    setModalOpen(false);
  };

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setEditorData(newData);
    const parser = new DOMParser();
    const doc = parser.parseFromString(newData, "text/html");
    const firstImage = doc.querySelector("img");
    if (firstImage && firstImage.src) {
      setThumbnail(firstImage.src);
    }
    if (doc && doc.body.textContent) {
      setDescription(doc.body.textContent.trim().substring(0, 40));
    }
  };

  const handleSelectUser = (nickname: string) => {
    const selectedUser = nicknames.find((n: string) => n === nickname);
    if (selectedUser) {
      setSupporter(selectedUser);
    }
  };

  const handleSubmit = async () => {
    try {
      const postData = {
        htmlContent: editorData,
        title,
        description,
        category,
        noticed,
        thumbnail,
        featured,
        fileName,
        postId,
        type,
        supporter,
        amount,
      };

      const response = await updatePost(postData);
      setIsSubmit(true);
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  const htmlContent = marked(editorData);

  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  const initialContent: InitialContent = {
    notice: "<p>공지사항 내용을 입력하세요.</p>",
    support: "<p>클랜을 위해 헌신하는 모든분들께 감사드립니다.</p>",
    forum: "<p>자유게시판 내용을 입력하세요.</p>",
    introduce: `<p>① 이름：<br><br>
      ② 생년월일：<br>
      <br>
      ③ 카톡아이디 :<br>
      <br>
      ④ 종족 :<br>
      <br>
      ⑤ 배틀태그ID#0000：<br>
      <br>
      ⑥ 현재 ID :<br>
      <br>
      ⑦ 희망 ID :<br>
      <br>
      ⑧ 래더점수(현재래더 / 하이래더)：<br>
      <br>
      ⑨ 유입경로(ex 인벤, 와고, 지인) :<br>
      <br>
      ⑩ 포부한마디: </p>`,
    feedback: "<p>건의사항 내용을 입력하세요.</p>",
    tactics: "<p>전략전술 내용을 입력하세요.</p>",
    dailycheckin: "<p>출석체크 내용을 입력하세요.</p>",
    proleaguenotice: "<p>프로리그 공지 내용을 입력하세요.</p>",
    ranking: "<p>랭킹전 내용을 입력하세요.</p>",
    event: "<p>이벤트 내용을 입력하세요.</p>",
    opponent: "<p>외부리그 내용을 입력하세요.</p>",
    versus: "<p>끝장전 내용을 입력하세요.</p>",
    beforetear: `<p>① 클랜아이디 : <br>
          <br>
          ② 배틀코드 : <br>
          <br>
          ③ 종족 : <br>
          <br>
          ④ 하이래더 : <br>
          <br>
          ⑤ 현래더 : <br>
          <br>
          <br>
          <br>
          &lt;&lt;필독&gt;&gt;<br>
          <br>
          ㄱ. 해당게시판에 양식에 맞추어 작성합니다.<br>
          ㄴ. 티어배정담당 [Be]_fOrU, [Be]_Ting 을 통하여 티어배정을 요청합니다.<br>
          ㄷ. 티어배정담당자의 매칭으로 게임을 진행합니다.<br>
          ㄹ. 총 3명과 3/2 경기 후 댓글로 경기결과를 작성합니다.<br>
          <br>
          <br>
          <br>
          ex)<br>
          vs [Be]_hOn 2:0 승<br>
          vs [Be]_fOru 1:2 패<br>
          vs [Be]_Ting 0:2 패</p>`,
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <Card className="flex flex-1 flex-col w-full lg:w-auto lg:max-w-[500px]">
        <CardHeader>글 수정하기</CardHeader>
        <div className="">
          <div className="flex flex-wrap gap-4 p-4">
            <Input
              size="sm"
              type="text"
              label="제목"
              value={title}
              onChange={handleTitleChange}
            />
            <Select
              label="게시판 선택"
              placeholder="게시판 선택"
              className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={[category]}
              onChange={(e) => handleCategoryChange(e)} // onChange 이벤트 핸들러 추가
            >
              <SelectSection
                title="CLANBE"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="notice">공지사항</SelectItem>
                <SelectItem key="support">클랜후원</SelectItem>
              </SelectSection>
              <SelectSection
                title="커뮤니티"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="forum">자유게시판</SelectItem>
                <SelectItem key="introduce">가입인사</SelectItem>
                <SelectItem key="feedback">건의사항</SelectItem>
                <SelectItem key="tactics">전략전술</SelectItem>
                <SelectItem key="dailycheckin">출석체크</SelectItem>
              </SelectSection>
              <SelectSection
                title="프로리그"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="proleaguenotice">프로리그 공지</SelectItem>
              </SelectSection>
              <SelectSection
                title="리그"
                classNames={{
                  heading: headingClasses,
                }}
              >
                <SelectItem key="beforetear">티어배정신청</SelectItem>
                <SelectItem key="aftertear">티어배정완료</SelectItem>
                <SelectItem key="ranking">랭킹전</SelectItem>
                <SelectItem key="event">이벤트</SelectItem>
                <SelectItem key="opponent">외부리그</SelectItem>
                <SelectItem key="versus">끝장전</SelectItem>
              </SelectSection>
            </Select>
            <div className="flex flex-col gap-2 w-full">
              <Checkbox
                isSelected={featured}
                size="md"
                onValueChange={setFeatured}
              >
                비밀글
              </Checkbox>
              {typeof user?.grade === "number" && user.grade >= 4 && (
                <Checkbox
                  isSelected={noticed}
                  size="md"
                  onValueChange={setNoticed}
                >
                  공지로 등록
                </Checkbox>
              )}
            </div>
            {category === "support" && (
              <div className="flex gap-2">
                <Select
                  className="w-1/3"
                  label="후원/지출"
                  value={type.toString()} // type 상태값 연결
                  onChange={(e) => setType(Number(e.target.value))} // type 상태 업데이트
                >
                  <SelectItem key="1" value="1">
                    후원
                  </SelectItem>
                  <SelectItem key="2" value="2">
                    지출
                  </SelectItem>
                </Select>
                <Autocomplete
                  label="후원/지출자"
                  className="w-3/5"
                  value={supporter}
                  onInputChange={(value) => {
                    if (supporter !== value) {
                      handleSelectUser(value);
                    }
                  }}
                  selectedKey={supporterKey.toUpperCase()}
                  onSelectionChange={setSupporterKey}
                >
                  {nicknames.map((nickname: string) => (
                    <AutocompleteItem
                      key={String(nickname).toUpperCase()}
                      value={nickname}
                    >
                      {nickname}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Input
                  className="w-1/2"
                  type="number"
                  label="후원/지출액"
                  value={amount.toString()} // amount 상태값 연결
                  onChange={(e) => setAmount(Number(e.target.value))} // amount 상태 업데이트
                />
              </div>
            )}
            <ButtonModal
              title={"수정하기"}
              text={"글을 수정하시겠습니까?"}
              action={handleSubmit}
            />
            <SubmitModal
              title={"수정완료"}
              text={"수정이 완료되었습니다."}
              isOpen={isSubmit}
              onClose={() => router.push(`/post/read/${postId}/${category}`)}
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
          {category === "support" && type === 1 && (
            <Card className="mx-4 h-[100px] flex items-center justify-center">
              <p className="font-bold text-2xl">
                {supporter}님께서 클랜을 위해
              </p>
              <p className="font-bold text-2xl">{amount}원을 후원하셨습니다.</p>
            </Card>
          )}
          {category === "support" && type === 2 && (
            <Card className="mx-4 h-[100px] flex items-center justify-center">
              <p className="font-bold text-2xl">
                {supporter}님께서 클랜활동을 위해
              </p>
              <p className="font-bold text-2xl">{amount}원을 지출하셨습니다.</p>
            </Card>
          )}
          <div
            className="ck-content p-8 break-words w-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </Card>
      </div>
      {/* 모달 컴포넌트 */}
      <SubmitModal
        title="양식 사용 확인"
        text="이 카테고리의 양식을 사용하시겠습니까?"
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={applyTemplate}
      />
    </div>
  );
}
