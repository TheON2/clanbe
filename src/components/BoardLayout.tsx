"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Pagination,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import { formatDate, formatRelativeDate } from "@/utils/dateUtils";
import NoticeCardHeader from "./NoticeCardHeader";
import PostCardComponent from "./PostCardComponent";
import { Post } from "../../types/types";
import { useRouter } from "next/navigation";

type BoardLayoutProps = {
  boardTitle: string;
  announce: Post[];
  posts: Post[];
  category: string;
};

const aligns = [
  { value: "default", label: "기본" },
  { value: "dateDesc", label: "날짜 내림차순" },
  { value: "dateAsc", label: "날짜 오름차순" },
  { value: "viewDesc", label: "조회수 내림차순" },
  { value: "viewAsc", label: "조회수 오름차순" },
];

const BoardLayout: React.FC<BoardLayoutProps> = ({
  category,
  boardTitle,
  announce,
  posts,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSortKey, setSelectedSortKey] = useState("default");
  const [sortedPosts, setSortedPosts] = useState(posts);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = useMemo(
    () => sortedPosts.slice(indexOfFirstPost, indexOfLastPost),
    [sortedPosts, indexOfFirstPost, indexOfLastPost]
  );
  const filteredAnnounce = useMemo(
    () =>
      announce
        .filter(
          (a) => a.noticed && a.category === category && a.category !== "notice"
        )
        .reverse(),
    [announce, category]
  );

  useEffect(() => {
    setSortedPosts(
      [...posts].sort((a, b) => {
        switch (selectedSortKey) {
          case "dateDesc":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "dateAsc":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "viewDesc":
            return b.view - a.view;
          case "viewAsc":
            return a.view - b.view;
          default:
            return b._id.localeCompare(a._id);
        }
      })
    );
  }, [selectedSortKey, posts]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleWritePost = () => {
    if (!isLoggedIn) {
      router.push("/auth/signin");
    } else {
      router.push("/post/write");
    }
  };

  const formatDateBasedOnDevice = (date: Date) =>
    isMobile ? formatRelativeDate(date) : formatDate(date);

  return (
    <div className="py-20 w-full mx-auto">
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
          <Button onClick={handleWritePost} color="primary">
            글쓰기
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">게시물 검색</ModalHeader>
          <ModalBody>
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
        </ModalContent>
      </Modal>
      <Card className="w-full max-w-full sm:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] py-4 mx-auto">
        {filteredAnnounce.map((announce) => (
          <NoticeCardHeader
            key={announce._id}
            announce={announce}
            date={formatDateBasedOnDevice(announce.createdAt)}
          />
        ))}
        <Divider />
        {currentPosts.map((post, index) => (
          <PostCardComponent
            key={index}
            title={post.title}
            author={post.author}
            views={post.view}
            date={formatDateBasedOnDevice(post.createdAt)}
            id={post._id}
            category={post.category}
          />
        ))}
      </Card>
      <div className="flex justify-center py-2">
        <Pagination
          total={Math.ceil(sortedPosts.length / postsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BoardLayout;
