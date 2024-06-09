import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Column, Team } from "../../types/types";
import SubmitModal from "./SubmitModal";
import { User } from "next-auth";
import { Chip, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { EyeIcon } from "../../public/EyeIcon";
import { DeleteIcon } from "../../public/DeleteIcon";

interface TableLayoutProps {
  column: Column; // Define the props for the TableLayout component here
  searchFields: string[];
  sortFields: string[];
  users?: User[];
  teams?: Team[];
}

const races = ["ALL", "Z", "T", "P"];
const tiers = ["ALL", "S+", "S", "A+", "A", "B+", "B", "C+", "C"];
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

//컬럼

//렌더셀

//테이블 타입

//모달

//필드 라벨

//서치필드

//솔트필드

//페이지당 보여줄 뷰

const TableLayout: React.FC<TableLayoutProps> = ({
  users,
  teams,
  searchFields,
  sortFields,
  column,
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const rowsPerPage = 4;

  const renderCell = useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "nickname":
        return <div>{cellValue}</div>;
      case "tier":
        return <p className="text-black">{cellValue}</p>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            //color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
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
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const filteredData = useMemo(() => {
    let data =
      users ??
      []
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
            idData: user.idData,
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

  return (
    <div className="w-full">
      {" "}
      <SubmitModal
        title={"알림"}
        text={modalMessage}
        isOpen={isSubmit}
        onClose={() => setIsSubmit(false)}
      />
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
    </div>
  );
};

export default TableLayout;
