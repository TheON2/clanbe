import {
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

const Notice = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="py-20">
      <h1>공지사항</h1>
      <div className="flex justify-between items-center mb-2">
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
        {/* 정렬기준 드랍다운과 버튼들 사이의 간격을 유지하기 위한 div */}
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
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>

          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
          <div className="flex gap-4 my-2">
            <Button
              className="h-[30px]"
              radius="full"
              color="primary"
              variant="ghost"
            >
              Ghost
            </Button>
            <p> 12/18 후원통장내역</p>
            <p className="ml-auto"> Classic 12.10.</p>
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-center py-2">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default Notice;
