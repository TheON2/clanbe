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

const AllPosts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const aligns = [
    { value: "default", label: "기본" },
    { value: "dateDesc", label: "날짜 내림차순" },
    { value: "dateAsc", label: "날짜 오름차순" },
    { value: "viewDesc", label: "조회수 내림차순" },
    { value: "viewAsc", label: "조회수 오름차순" },
  ];

  const [selectedSortKey, setSelectedSortKey] = useState("default");
  const [sortedBoard, setSortedBoard] = useState([...board]);

  // 현재 페이지에 따라 보여줄 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBoard.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const sorted = [...board].sort((a, b) => {
      switch (selectedSortKey) {
        case "default":
          return b.id - a.id;
        case "dateDesc":
          return b.date - a.date;
        case "dateAsc":
          return a.date - b.date;
        case "viewDesc":
          return b.view - a.view;
        case "viewAsc":
          return a.view - b.view;
        default:
          return 0;
      }
    });
    setSortedBoard(sorted);
  }, [selectedSortKey]);
  return (
    <div className="py-20 w-full mx-auto min-w-[630px]">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20">전체 게시글</a>
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
          total={Math.ceil(sortedBoard.length / postsPerPage)} // 정렬된 게시물 배열의 길이 기준으로 총 페이지 수 계산
          initialPage={1}
          page={currentPage} // 현재 페이지 상태를 Pagination 컴포넌트에 명시적으로 전달
          onChange={(page) => handlePageChange(page)} // 페이지 변경 시 handlePageChange 호출
        />
      </div>
    </div>
  );
};

export default AllPosts;
