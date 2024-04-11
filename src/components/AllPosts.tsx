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
import React from "react";
import { aligns, searchOption, posts } from "../../public/data";

const AllPosts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="py-20 w-full mx-auto min-w-[630px]">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20">전체 게시글</a>
      <div className="flex justify-between items-center m-2">
        <Select
          isRequired
          label="정렬기준"
          placeholder="게시글 정렬 기준"
          defaultSelectedKeys={["기본"]}
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
                  label="검색 옵션"
                  placeholder="게시글 정렬 기준"
                  defaultSelectedKeys={["제목"]}
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
        <CardHeader className="flex justify-between items-center px-4 py-2">
          <div className="w-full sm:w-1/12 text-center">공지</div>
          <div className="w-full sm:w-7/12 text-center">
            2024 3월 3일 공지사항
          </div>
          <div className="w-full sm:w-1/12 text-center">24.03.03</div>
        </CardHeader>
        <Divider />
        <CardHeader className="flex justify-between items-center px-4 py-2">
          <div className="w-full sm:w-1/12 text-center">공지</div>
          <div className="w-full sm:w-7/12 text-center">CLANBE 후원계좌</div>
          <div className="w-full sm:w-1/12 text-center">22.02.10</div>
        </CardHeader>
        <Divider />
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col px-4 py-2 gap-4">
            <div className="font-bold text-xl">{post.title}</div>
            <div className="flex flex-row mx-4">
              <div className="flex flex-row items-center justify-center sm:justify-start font-bold gap-4">
                <Avatar
                  size="sm"
                  isBordered
                  color="success"
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                />
                <span>{post.author}</span>
              </div>
              <div className="mx-4">조회 수 {post.views}</div>
              <div className="mx-4">{post.date}</div>
            </div>
            <Divider />
          </div>
        ))}
      </Card>

      <div className="flex justify-center py-2">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default AllPosts;
