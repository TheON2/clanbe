"use client";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Pagination,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  aligns,
  searchOption,
  posts,
  announce,
  board,
} from "../../public/data";
import NoticeCardHeader from "./NoticeCardHeader";
import PostCardComponent from "./PostCardComponent";
import { Post } from "../../types/types";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

type BoardLayoutProps = {
  boardTitle: string;
  announce: Post[];
  posts: Post[];
};

const BoardLayout: React.FC<BoardLayoutProps> = ({
  boardTitle,
  announce,
  posts,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const aligns = [
    { value: "default", label: "기본" },
    { value: "dateDesc", label: "날짜 내림차순" },
    { value: "dateAsc", label: "날짜 오름차순" },
    { value: "viewDesc", label: "조회수 내림차순" },
    { value: "viewAsc", label: "조회수 오름차순" },
  ];

  const [selectedSortKey, setSelectedSortKey] = useState("default");
  const [sortedBoard, setSortedBoard] = useState([...posts]);

  // 현재 페이지에 따라 보여줄 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBoard.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
      month: "2-digit", // 'long', 'short', 'narrow', 'numeric', '2-digit' 중 하나를 사용
      day: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
      hour: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
      minute: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
      hour12: true,
      timeZone: "Asia/Seoul",
    };

    return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
  }

  function formatRelativeDate(date: Date) {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  }

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 현재 게시물 렌더링
  const getFormattedDate = (date: Date) => {
    return isMobile ? formatRelativeDate(date) : formatDate(date);
  };

  useEffect(() => {
    const sorted = [...posts].sort((a, b) => {
      switch (selectedSortKey) {
        case "default":
          // MongoDB의 ObjectId를 기반으로 최신 순 정렬
          return b._id.localeCompare(a._id);
        case "dateDesc":
          // 날짜를 기준으로 내림차순 정렬, Date 객체로 변환하여 비교
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "dateAsc":
          // 날짜를 기준으로 오름차순 정렬, Date 객체로 변환하여 비교
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "viewDesc":
          return b.view - a.view;
        case "viewAsc":
          return a.view - b.view;
        default:
          return 0;
      }
    });
    setSortedBoard(sorted);
  }, [selectedSortKey, posts]);

  return (
    <div className="py-20 w-full mx-auto ">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20">{boardTitle}</a>
      <div className="flex justify-between items-center m-2">
        <Select
          isRequired
          label="정렬기준"
          placeholder="기본"
          value={selectedSortKey}
          onChange={(e) => setSelectedSortKey(e.target.value)}
          className="w-full sm:w-[200px]"
        >
          {aligns.map((align) => (
            <SelectItem key={align.value} value={align.value}>
              {align.label}
            </SelectItem>
          ))}
        </Select>
        <div className="flex space-x-2">
          <Button onPress={onOpen} color="primary">
            검색
          </Button>
          <Button onClick={() => router.push("/post/write")} color="primary">
            글쓰기
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                게시물 검색
              </ModalHeader>
              <ModalBody>
                <Select
                  isRequired
                  label="검색 옵션"
                  placeholder="기본"
                  defaultSelectedKeys={["기본"]}
                  className="w-full sm:w-[200px] py-2"
                >
                  {searchOption.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="검색어"
                  placeholder="검색어를 입력하세요"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card className="w-full max-w-full sm:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] py-4 mx-auto">
        {announce.map((announce) => (
          <NoticeCardHeader
            key={announce._id}
            title={announce.title}
            date={getFormattedDate(announce.createdAt)}
          />
        ))}
        <Divider />
        {/* 현재 페이지의 게시물 렌더링 */}
        {currentPosts.map((post, index) => (
          <PostCardComponent
            key={index}
            title={post.title}
            author={post.author}
            views={post.view}
            date={getFormattedDate(post.createdAt)}
            id={post._id}
            category={post.category}
          />
        ))}
      </Card>
      <div className="flex justify-center py-2">
        <Pagination
          showControls
          total={Math.ceil(sortedBoard.length / postsPerPage)} // 정렬된 게시물 배열의 길이 기준으로 총 페이지 수 계산
          initialPage={1}
          page={currentPage} // 현재 페이지 상태를 Pagination 컴포넌트에 명시적으로 전달
          onChange={(page) => handlePageChange(page)} // 페이지 변경 시 handlePageChange 호출
        />
      </div>
    </div>
  );
};

export default BoardLayout;
