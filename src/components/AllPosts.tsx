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
import {
  aligns,
  searchOption,
  posts,
  announce,
  board,
} from "../../public/data";
import NoticeCardHeader from "./NoticeCardHeader";
import PostCardComponent from "./PostCardComponent";

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
        {announce.map((announce) => (
          <NoticeCardHeader
            key={announce.id}
            title={announce.title}
            date={announce.date}
          />
        ))}
        <Divider />
        {board.map((post, index) => (
          <PostCardComponent
            key={index}
            title={post.title}
            author={post.author}
            views={post.view}
            date={post.date}
          />
        ))}
      </Card>

      <div className="flex justify-center py-2">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default AllPosts;
