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

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "user":
        return (
          <div className="w-[200px]">
            <Card>
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
                <Button color="danger">삭제</Button>
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
                <p className="font-bold text-md">{user.user.phone}</p>
                <p className="font-bold text-md">
                  {formatDateOnly(user.user.birth)}
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
                onClick={() => handleDelete(user.nickname)}
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

  const handleDelete = async (userId: string) => {
    try {
      const response = await updateUserTeam(userId, "");
      if (response) {
        setModalMessage("성공적으로 팀에서 제외 했습니다.");
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
      <div className="w-full">
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
              <Tabs>
                <Tab key={"user"} title="유저">
                  <Table>
                    <TableHeader columns={userColumns}>
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          align={column.align}
                          width={column.width}
                          className="text-center"
                        >
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={userData}>
                      {(item: any) => (
                        <TableRow key={item.id} className="text-center">
                          {(columnKey) => (
                            <TableCell
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
