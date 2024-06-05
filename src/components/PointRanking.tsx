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
  Avatar,
} from "@nextui-org/react";
import { User } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDateOnly } from "@/utils/dateUtils";
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

interface PointRankingProps {
  users: User[];
}

const PointRanking: React.FC<PointRankingProps> = ({ users }) => {
  const fieldLabels: { [key: string]: string } = {
    point: "포인트",
    name: "이름",
    nickname: "닉네임",
    email: "이메일",
    kakao: "카카오",
    phone: "폰",
    role: "역할",

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
    D: "bg-red-200",
  };

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("point");
  const [sortOrder, setSortOrder] = useState("desc");
  const rowsPerPage = 8;
  const filteredData = useMemo(() => {
    let data = users
      .filter((user: any) => {
        if (!searchField) return true;
        return user[searchField]
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .sort((a: any, b: any) => b.point - a.point)
      .map((user: any, idx: number) => ({
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
        },
        role: user.role,
        point: user.point,
        ranking: idx + 1,
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

  const maxPoint = Math.max(...filteredData.map((user: any) => user.point));

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);
  const renderCell = useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];

    switch (columnKey) {
      case "user":
        return (
          <div className="w-full flex justify-center items-center">
            <Card className="w-[100px] md:w-[150px]">
              <div className="flex items-center">
                <Avatar src={user.user.avatar} size="sm" className="m-2" />
                <div className="flex flex-col">
                  <p className="font-bold text-md md:text-xl">
                    {user.user.nickname}
                  </p>
                  <p className="font-bold text-xs md:text-lg">
                    @{user.user.name}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
      case "nickname":
        return <div>{cellValue}</div>;
      case "point":
        return (
          <div className="relative w-full flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div
                className="bg-blue-500 h-8 rounded-full"
                style={{
                  width: `${(user.point / maxPoint) * 100}%`,
                }}
              ></div>
            </div>
            <span className="absolute w-full text-center text-xs font-bold dark:text-black">
              {user.point}
            </span>
          </div>
        );
      case "birth":
      case "createdAt":
        return <div>{formatDateOnly(cellValue)}</div>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const userColumns: Column[] = [
    {
      name: "랭킹",
      uid: "ranking",
      sortable: true,
      align: "center",
      width: 30,
    },
    {
      name: "유저정보",
      uid: "user",
      sortable: true,
      align: "center",
      width: 100,
    },
    {
      name: "포인트",
      uid: "point",
      sortable: true,
      align: "center",
    },
  ];

  return (
    <div>
      <p className="font-bold text-xl sm:text-3xl px-4 mb-4">포인트 랭킹</p>
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

export default PointRanking;
