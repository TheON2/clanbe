import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Pagination,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export const aligns = [
  {
    label: "기본",
    value: "기본",
    description: "기본기준으로 게시글을 정렬합니다.",
  },
  {
    label: "날짜",
    value: "날짜",
    description: "게시날짜 순으로 게시글을 정렬합니다.",
  },
  {
    label: "조회수",
    value: "조회수",
    description: "조회수 순으로 게시글을 정렬합니다.",
  },
];

export const searchOption = [
  {
    label: "제목",
    value: "제목",
    description: "제목기준으로 게시글을 검색합니다.",
  },
  {
    label: "내용",
    value: "내용",
    description: "내용 순으로 게시글을 검색합니다.",
  },
  {
    label: "닉네임",
    value: "닉네임",
    description: "닉네임 순으로 게시글을 검색합니다.",
  },
];

const posts = [
  {
    number: "공지",
    title: "2024, 3월, 3일 공지사항",
    author: "forU",
    date: "24.03.03.",
    views: "68",
  },
  {
    number: "공지",
    title: "2.13 공지사항",
    author: "forU",
    date: "24.02.13.",
    views: "80",
  },
  {
    number: "공지",
    title: "12.16 영업진 회의 공지사항",
    author: "forU",
    date: "22.12.18.",
    views: "290",
  },
  {
    number: "공지",
    title: "06.25 영업진 회의 공지사항",
    author: "JPAPA",
    date: "22.06.27.",
    views: "348",
  },
  {
    number: "34",
    title: "프로모션 진행중",
    author: "hOn",
    date: "22.03.25.",
    views: "106",
  },
  {
    number: "33",
    title: "3.17 영업진회의",
    author: "hOn",
    date: "22.03.18.",
    views: "77",
  },
];

const Notice = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="py-20">
      <a className="font-bold text-3xl px-4 mb-20">공지사항</a>
      <div className="flex justify-between items-center m-2">
        <Select
          isRequired
          label="정렬기준"
          placeholder="게시글 정렬 기준"
          defaultSelectedKeys={["기본"]}
          className="w-[200px]"
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
          <Button onPress={onOpen} color="primary">
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
                  label="정렬기준"
                  placeholder="게시글 정렬 기준"
                  defaultSelectedKeys={["제목"]}
                  className="w-[200px] py-2"
                >
                  {searchOption.map((align) => (
                    <SelectItem key={align.value} value={align.value}>
                      {align.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="검색어"
                  placeholder="검색어를 입력하세요"
                  type="password"
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
      <Card className="w-[1000px] py-4">
        <CardHeader className="flex justify-between items-center px-4 py-2">
          <div className="w-1/12 text-center">번호</div>
          <div className="w-7/12 text-center">제목</div>
          <div className="w-2/12 text-center">글쓴이</div>
          <div className="w-1/12 text-center">날짜</div>
          <div className="w-1/12 text-center">조회수</div>
        </CardHeader>
        <Divider />
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-2"
          >
            <div className="w-1/12 text-center">{post.number}</div>
            <div className="w-7/12 text-center">{post.title}</div>
            <div className="w-2/12 flex items-center justify-start font-bold gap-2">
              <Avatar
                isBordered
                color="success"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
              {post.author}
            </div>
            <div className="w-1/12 text-center">{post.date}</div>
            <div className="w-1/12 text-center">{post.views}</div>
          </div>
        ))}
      </Card>

      <div className="flex justify-center py-2">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default Notice;
