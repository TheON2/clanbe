"use client";

import { useCallback, useMemo, useState } from "react";
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
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Chip,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDateOnly } from "@/utils/dateUtils";
import { deleteUser } from "@/service/user";
import { EditIcon } from "../../../public/EditIcon";
import { EyeIcon } from "../../../public/EyeIcon";
import { DeleteIcon } from "../../../public/DeleteIcon";
import {
  updateUserPoint,
  updateUserRace,
  updateUserRole,
  updateUserTier,
} from "@/service/admin";
import { parse } from "path";

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

const AdminUserTab = ({ users, setModalMessage, setIsSubmit }: any) => {
  const fieldLabels: { [key: string]: string } = {
    name: "이름",
    nickname: "닉네임",
    email: "이메일",
    kakao: "카카오",
    phone: "폰",
    role: "역할",
    point: "포인트",
    createdAt: "가입일",
  };
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
  const tierColorMap: Record<string, string> = {
    "S+": "bg-green-100",
    S: "bg-green-200",
    "A+": "bg-blue-100",
    A: "bg-blue-200",
    "B+": "bg-yellow-100",
    B: "bg-yellow-200",
    C: "bg-red-100",
    "C+": "bg-red-200",
  };

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [point, setPoint] = useState<string>("");
  const rowsPerPage = 4;
  const guestCount = useMemo(
    () => users.filter((user: any) => user.role === "Guest").length,
    [users]
  );

  const filteredData = useMemo(() => {
    let data = users
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
          idData: user.idData,
          role: user.role,
          point: user.point,
          createdAt: new Date(user.createdAt),
        },
        role: user.role,
        point: user.point,
        actions: "actions",
        createdAt: new Date(user.createdAt),
      }));

    data = data.sort((a: any, b: any) => {
      let aValue, bValue;

      if (searchFields.includes(sortField)) {
        aValue = a.user[sortField];
        bValue = b.user[sortField];
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else if (aValue instanceof Date && bValue instanceof Date) {
        if (sortOrder === "asc") {
          return aValue.getTime() - bValue.getTime();
        } else {
          return bValue.getTime() - aValue.getTime();
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
  }, [search, searchField, sortField, sortOrder, users, searchFields]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);

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

  const handleUpdateRole = async (usernickname: string, role: string) => {
    try {
      const response = await updateUserRole(usernickname, role);
      if (response) {
        setModalMessage("성공적으로 유저역할을 변경했습니다.");
      } else {
        setModalMessage("유저정보 변경에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 정보 변경 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  const handleUpdateTier = async (usernickname: string, tier: string) => {
    try {
      const response = await updateUserTier(usernickname, tier);
      if (response) {
        setModalMessage("성공적으로 티어를 변경했습니다.");
      } else {
        setModalMessage("유저정보 변경에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 정보 변경 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  const handleUpdatePoint = async (usernickname: string, point: number) => {
    try {
      const response = await updateUserPoint(usernickname, point);
      if (response) {
        setModalMessage("성공적으로 포인트를 변경했습니다.");
      } else {
        setModalMessage("유저정보 변경에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 정보 변경 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  const handleUpdateRace = async (usernickname: string, race: string) => {
    try {
      const response = await updateUserRace(usernickname, race);
      if (response) {
        setModalMessage("성공적으로 종족을 변경했습니다.");
      } else {
        setModalMessage("유저정보 변경에 실패했습니다.");
      }
      setIsSubmit(true);
    } catch (error) {
      setModalMessage("유저 정보 변경 중 오류가 발생했습니다.");
      setIsSubmit(true);
    }
  };

  const handleGuestClick = () => {
    setSearchField("role");
    setSearch("Guest");
    setPage(1);
  };

  const renderCell = useCallback(
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof any];

      switch (columnKey) {
        case "user":
          return (
            <div className="w-full flex justify-center items-center">
              <Card className="w-[200px] md:w-full">
                <div className="flex items-center mx-0 md:mx-4">
                  <Avatar src={user.user.avatar} size="md" className="m-2" />
                  <div className="flex flex-col">
                    <p className="font-bold text-md">{user.user.nickname}</p>
                    <p className="font-bold text-sm">@{user.user.name}</p>
                  </div>
                  <div className="flex gap-2 items-center ml-auto mr-2">
                    <button
                      color="primary"
                      onClick={() =>
                        router.push(`/user/profile/${user.user.email}`)
                      }
                    >
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </button>
                    <button
                      color="danger"
                      onClick={() => handleDelete(user.user.nickname)}
                    >
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </button>
                    <div>
                      <Popover placement={"right"}>
                        <PopoverTrigger>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                          </span>
                        </PopoverTrigger>
                        <PopoverContent className="">
                          <div>
                            <Image
                              src={user.user.idData || "/Belogo.png"}
                              width={500}
                              height={300}
                              alt="ID"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-center gap-2 md:gap-8 mx-2">
                  <p className="font-bold">
                    Role <br />
                    {user.role}
                  </p>
                  <p className="font-bold">
                    Point <br /> {user.point}
                  </p>
                  <p className="font-bold">{formatDateOnly(user.createdAt)}</p>
                </div>
                <Divider />
                <div className="flex flex-col ">
                  <p>
                    Email {user.user.email} <br />
                  </p>
                  <p>
                    Kakao {user.user.kakao} <br />
                  </p>
                  <p className="">H.P {user.user.phone}</p>
                  <p className="text-sm">
                    Birth {formatDateOnly(user.user.birth)}
                  </p>
                </div>
              </Card>
            </div>
          );
        case "nickname":
          return <div>{cellValue}</div>;
        case "birth":
        case "createdAt":
          return <div>{formatDateOnly(cellValue)}</div>;
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );

        case "actions":
          return (
            <div className="flex flex-col items-center justify-center gap-4 ">
              <Tooltip content="Edit user">
                <Popover placement={"right"}>
                  <PopoverTrigger>
                    <Chip
                      className="w-full text-sm text-center cursor-pointer"
                      size="sm"
                      color="primary"
                    >
                      <div className="">등 급</div>
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col gap-1">
                      <p className="text-center">등급 변경</p>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRole(user.user.nickname, "Guest")
                        }
                      >
                        <div className="w-[70px]">Guest</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRole(user.user.nickname, "Member")
                        }
                      >
                        <div className="w-[70px]">Member</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRole(user.user.nickname, "Staff")
                        }
                      >
                        <div className="w-[70px]">Staff</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRole(user.user.nickname, "Master")
                        }
                      >
                        <div className="w-[70px]">Master</div>
                      </Chip>
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
              <Tooltip content="Edit user">
                <Popover placement={"right"}>
                  <PopoverTrigger>
                    <Chip
                      className="w-full text-sm text-center cursor-pointer"
                      size="sm"
                      color="primary"
                    >
                      <div className="">종 족</div>
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col gap-1">
                      <p className="text-center">종족 변경</p>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRace(user.user.nickname, "p")
                        }
                      >
                        <div className="w-[70px]">P</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRace(user.user.nickname, "t")
                        }
                      >
                        <div className="w-[70px]">T</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateRace(user.user.nickname, "z")
                        }
                      >
                        <div className="w-[70px]">Z</div>
                      </Chip>
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
              <Tooltip content="Edit user">
                <Popover placement={"right"}>
                  <PopoverTrigger>
                    <Chip
                      className="w-full text-sm text-center cursor-pointer"
                      size="sm"
                      color="primary"
                    >
                      <div className="">티 어</div>
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col gap-1">
                      <p className="text-center">티어 변경</p>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "S+")
                        }
                      >
                        <div className="w-[70px]">S+</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "S")
                        }
                      >
                        <div className="w-[70px]">S</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "A+")
                        }
                      >
                        <div className="w-[70px]">A+</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "A")
                        }
                      >
                        <div className="w-[70px]">A</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "B+")
                        }
                      >
                        <div className="w-[70px]">B+</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "B")
                        }
                      >
                        <div className="w-[70px]">B</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "C+")
                        }
                      >
                        <div className="w-[70px]">C+</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "C")
                        }
                      >
                        <div className="w-[70px]">C</div>
                      </Chip>
                      <Chip
                        className="w-full text-sm text-center cursor-pointer"
                        size="sm"
                        color="primary"
                        onClick={() =>
                          handleUpdateTier(user.user.nickname, "F")
                        }
                      >
                        <div className="w-[70px]">F</div>
                      </Chip>
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
              <Tooltip>
                <Popover placement={"right"}>
                  <PopoverTrigger>
                    <Chip
                      className="w-full text-xs text-center cursor-pointer"
                      size="sm"
                      color="primary"
                    >
                      <div className="">포인트</div>
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col gap-1">
                      <p className="text-center">포인트 변경</p>
                      <p className="text-center">
                        {user.user.nickname} 현재 : {user.point}
                      </p>
                      <Input
                        placeholder="변경할 포인트"
                        className="w-full mb-2"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                      />
                      <Button
                        className="w-full"
                        onClick={() =>
                          handleUpdatePoint(user.user.nickname, parseInt(point))
                        }
                      >
                        변경하기
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [point, router, setIsSubmit, setModalMessage]
  );

  const userColumns: Column[] = [
    {
      name: "유저정보",
      uid: "user",
      sortable: true,
      align: "center",
      width: 100,
    },
    {
      name: "Action",
      uid: "actions",
      sortable: true,
      align: "center",
      width: 30,
    },
  ];

  return (
    <div>
      <div className="m-4 flex flex-col gap-2">
        <p>가입대기유저 {guestCount} 명</p>
        <Button className="w-[150px]" onClick={handleGuestClick}>
          대기유저 확인하기
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 p-2">
        <div className="flex gap-2 w-full md:w-1/2">
          <Select
            aria-label="select"
            placeholder="검색 기준"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            {searchFields.map((field) => (
              <SelectItem key={field} value={field}>
                {fieldLabels[field]}
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
        </div>
        <div className="flex gap-2 w-full md:w-1/2">
          <Select
            placeholder="필터 기준"
            aria-label="select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            {sortFields.map((field) => (
              <SelectItem key={field} value={field}>
                {fieldLabels[field]}
              </SelectItem>
            ))}
          </Select>
          <Select
            aria-label="select"
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
    </div>
  );
};

export default AdminUserTab;
