"use client";

import { useCallback, useMemo, useState } from "react";
import { User } from "next-auth";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CircularProgress,
  Divider,
  Switch,
  Button,
  User as UiUser,
  Chip,
  Tooltip,
  ChipProps,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Team } from "../../types/types";
import ProfileCard from "./ProfileCard";
import ProleagueProfileCard from "./ProleagueProfileCard";
import ProleagueAvatarCard from "./ProleagueAvatarCard";

import { EditIcon } from "../../public/EditIcon";
import { EyeIcon } from "../../public/EyeIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { updateUserTeam } from "@/service/team";
import SubmitModal from "./SubmitModal";
import { formatDate, formatDateOnly } from "@/utils/dateUtils";
import { deleteUser } from "@/service/user";

interface Column {
  name: string;
  uid: string;
  sortable: boolean;
  align?: "center" | "start" | "end";
  width?: number;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const tierColorMap: Record<string, string> = {
  "S+": "bg-green-100",
  S: "bg-green-200",
  "A+": "bg-blue-100",
  A: "bg-blue-200",
  "B+": "bg-yellow-100",
  B: "bg-yellow-200",
  C: "bg-red-100",
  D: "bg-red-200",
};

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  [key: string]: string | number; // 인덱스 시그니처 추가
}

export default function AdminComponent({ teams, users, points, posts }: any) {
  const router = useRouter();

  type User = (typeof users)[0];

  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  const rowsPerPage = 4;

  const searchFields = ["name", "nickname", "email", "kakao", "phone", "role"];
  const sortFields = [
    "name",
    "nickname",
    "email",
    "kakao",
    "phone",
    "role",
    "point",
    "createdAt",
  ];

  const filteredData: UserItem[] = useMemo(() => {
    let data = users
      .filter((user: any) => user.team)
      .filter((user: any) => {
        if (!searchField) return true;
        return user[searchField]
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .map((user: any) => ({
        id: user._id,
        user: {
          nickname: user.nickname,
          email: user.email,
          name: user.name,
          kakao: user.kakao,
          phone: user.phone,
          birth: user.birth,
          avatar: user.avatar,
        },
        role: user.role,
        point: user.point,
        idData: user.idData,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));

    data = data.sort((a, b) => {
      let aValue, bValue;

      // Check if sorting field is a property of 'user' object
      if (searchFields.includes(sortField)) {
        aValue = a.user[sortField];
        bValue = b.user[sortField];
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      // Handle comparison for different data types (string and number)
      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }
    });

    return data;
  }, [search, searchField, sortField, sortOrder, users]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "user":
        return (
          <div className="w-full flex justify-center items-center">
            <Card className="w-[220px]">
              <CardHeader>
                <div className="flex justify-center items-center">
                  <Avatar src={user.user.avatar} size="lg" className="m-2" />
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">{user.user.nickname}</p>
                    <p className="font-bold text-lg">@{user.user.name}</p>
                  </div>
                </div>
              </CardHeader>
              <div className="flex gap-2 justify-center">
                <Button
                  color="primary"
                  onPress={() =>
                    router.push(`/user/profile/${user.user.email}`)
                  }
                >
                  수정
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(user.user.nickname)}
                >
                  삭제
                </Button>
              </div>
              <CardBody>
                <p>
                  email <br />
                </p>
                <p className="font-bold text-md">{user.user.email}</p>
                <p>
                  kakao <br />
                </p>
                <p className="font-bold text-md">{user.user.kakao}</p>
                <p className="font-bold text-md">H.P {user.user.phone}</p>
                <p className="font-bold text-md">
                  Birth {formatDateOnly(user.user.birth)}
                </p>
              </CardBody>
            </Card>
          </div>
        );
      case "nickname":
        return <div>{cellValue}</div>;
      case "idData":
        return (
          <div>
            {" "}
            <Popover placement={"right"}>
              <PopoverTrigger>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </PopoverTrigger>
              <PopoverContent className="">
                <div>
                  <Image
                    src={cellValue || "/Belogo.png"}
                    width={500}
                    height={300}
                    alt="ID"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      case "birth":
      case "createdAt":
        return <div>{formatDateOnly(cellValue)}</div>;
      case "tier":
        return <p className="text-black">{cellValue}</p>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => router.push(`/user/profile/${user.email}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                //onClick={() => handleDelete(user.nickname)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <Popover placement={"right"}>
                <PopoverTrigger>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="">
                  <div className="flex flex-col gap-1">
                    {teams.map((team: any) => (
                      <Chip
                        key={team._id}
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        //onClick={() => handleUpdate(user.nickname, team._id)}
                      >
                        <div className="w-[70px]">{team.name}</div>
                      </Chip>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const userColumns: Column[] = [
    {
      name: "유저정보",
      uid: "user",
      sortable: true,
      align: "center",
      width: 100,
    },
    {
      name: "역할",
      uid: "role",
      sortable: true,
      align: "center",
      width: 30,
    },
    {
      name: "포인트",
      uid: "point",
      sortable: true,
      align: "center",
      width: 30,
    },
    {
      name: "신분증",
      uid: "idData",
      sortable: true,
      align: "center",
      width: 30,
    },
    {
      name: "가입일",
      uid: "createdAt",
      sortable: true,
      align: "center",
      width: 30,
    },
  ];

  const postColumns: Column[] = [
    { name: "티어", uid: "tier", sortable: true, align: "start", width: 30 },
    {
      name: "닉네임",
      uid: "nickname",
      sortable: true,
      align: "center",
      width: 30,
    },
    { name: "종족", uid: "race", sortable: true, align: "start", width: 30 },
    { name: "승", uid: "wins", sortable: true, align: "center", width: 30 },
    { name: "패", uid: "losses", sortable: true, align: "center", width: 30 },
  ];

  const pointColumns: Column[] = [
    { name: "티어", uid: "tier", sortable: true, align: "start", width: 30 },
    {
      name: "닉네임",
      uid: "nickname",
      sortable: true,
      align: "center",
      width: 30,
    },
    { name: "종족", uid: "race", sortable: true, align: "start", width: 30 },
    { name: "승", uid: "wins", sortable: true, align: "center", width: 30 },
    { name: "패", uid: "losses", sortable: true, align: "center", width: 30 },
  ];

  const userData = useMemo(() => {
    return users
      .filter((user: any) => user.team)
      .map((user: any) => ({
        id: user._id,
        user: {
          nickname: user.nickname,
          email: user.email,
          name: user.name,
          kakao: user.kakao,
          phone: user.phone,
          birth: user.birth,
          avatar: user.avatar,
        },
        role: user.role,
        point: user.point,
        idData: user.idData,
        createdAt: user.createdAt,
      }));
  }, [users]);

  const handleDelete = async (nickname: string) => {
    try {
      const response = await deleteUser(nickname);
      if (response) {
        setModalMessage("성공적으로 유저를 삭제했습니다.");
      } else {
        setModalMessage("유저 삭제에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 삭제 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  return (
    <>
      <div className="md:w-2/3 w-full mx-auto">
        <SubmitModal
          title={"알림"}
          text={modalMessage}
          isOpen={isSubmit}
          onClose={() => setIsSubmit(false)}
        />
        <p className="font-bold text-3xl">어드민 페이지</p>
        <div>
          <Card>
            <CardBody>
              <Tabs aria-label="tabs">
                <Tab key={"user"} title="유저" aria-label="usertab">
                  <div className="flex gap-4 mb-4">
                    <Select
                      placeholder="검색 기준"
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                    >
                      {searchFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      placeholder="검색어"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                    />
                    <Select
                      placeholder="필터 기준"
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                    >
                      {sortFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      placeholder="필터 방법"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <SelectItem key="desc" value="desc">
                        내림차순
                      </SelectItem>
                      <SelectItem key="asc" value="asc">
                        오름차순
                      </SelectItem>
                    </Select>
                  </div>
                  <Table aria-label="usertable">
                    <TableHeader columns={userColumns} aria-label="userheader">
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          align={column.align}
                          width={column.width}
                          className="text-center"
                          aria-label="usercolumn"
                        >
                          <div>{column.name}</div>
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={items} aria-label="userbody">
                      {(item: any) => (
                        <TableRow key={item.id} className="text-center">
                          {(columnKey) => (
                            <TableCell
                              aria-label="usercell"
                              className={
                                columnKey === "tier"
                                  ? `${
                                      tierColorMap[item.tier] || "bg-gray-100"
                                    } text-center`
                                  : "text-center"
                              }
                            >
                              {renderCell(item, columnKey)}
                            </TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="flex justify-center mt-4">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                </Tab>
                <Tab key={"point"} title="포인트">
                  2
                </Tab>
                <Tab key={"post"} title="게시물">
                  3
                </Tab>
              </Tabs>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
