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
import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 현재 페이지에 따라 보여줄 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = board.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        {/* 현재 페이지의 게시물 렌더링 */}
        {currentPosts.map((post, index) => (
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
        <Pagination
          showControls
          total={Math.ceil(board.length / postsPerPage)}
          initialPage={1}
          onChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
};

export default AllPosts;
