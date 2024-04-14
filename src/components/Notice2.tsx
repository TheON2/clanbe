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

const Notice = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="py-20 w-full mx-8">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20">공지사항</a>
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
      <Card className="w-full sm:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto">
        <CardHeader className="flex justify-between items-center px-4 py-2">
          <div className="w-full sm:w-1/12 text-center">번호</div>
          <div className="w-full sm:w-7/12 text-center">제목</div>
          <div className="w-full sm:w-2/12 flex items-center justify-center sm:justify-start font-bold gap-2">
            글쓴이
          </div>
          <div className="w-full sm:w-1/12 text-center">날짜</div>
          <div className="w-full sm:w-1/12 text-center">조회수</div>
        </CardHeader>
        <Divider />
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-2"
          >
            <div className="w-full sm:w-1/12 text-center">{post.number}</div>
            <div className="w-full sm:w-7/12 text-center">{post.title}</div>
            <div className="w-full sm:w-2/12 flex items-center justify-center sm:justify-start font-bold gap-2">
              <Avatar
                isBordered
                color="success"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
              {post.author}
            </div>
            <div className="w-full sm:w-1/12 text-center">{post.date}</div>
            <div className="w-full sm:w-1/12 text-center">{post.views}</div>
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
