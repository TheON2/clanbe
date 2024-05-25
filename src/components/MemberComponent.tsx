"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Pagination,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Input,
  Chip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { User as MyUser } from "next-auth";
import { useCallback, useMemo, useState } from "react";
import { formatDateOnly } from "@/utils/dateUtils";
import { Key } from "@fullcalendar/core/preact";

type MemberComponentProps = {
  users: MyUser[];
};

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
  z: "success",
  p: "danger",
  t: "primary",
};

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
  D: "bg-red-200",
};

function getNestedValue(obj: any, path: any) {
  return path.split(".").reduce((acc: any, part: any) => acc && acc[part], obj);
}

const columns = [
  { name: "NAME", uid: "nickname" },
  { name: "종족", uid: "BELO.race" },
  { name: "TEAR", uid: "tear" },
  { name: "ROLE", uid: "role" },
  { name: "가입일자", uid: "createdAt" },
];

const adminColumns = [
  { name: "NAME", uid: "nickname" },
  { name: "종족", uid: "BELO.race" },
  { name: "phone", uid: "phone" },
  { name: "kakao", uid: "kakao" },
  { name: "TEAR", uid: "tear" },
  { name: "ROLE", uid: "role" },
  { name: "가입일자", uid: "createdAt" },
];

export default function MemberComponent({ users }: MemberComponentProps) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  // 운영진 페이지네이션
  const [adminPage, setAdminPage] = useState(1);
  const adminRowsPerPage = 10;

  // 클랜원 페이지네이션
  const [memberPage, setMemberPage] = useState(1);
  const memberRowsPerPage = 10;

  const filteredData = useMemo(() => {
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
        ...user,
        createdAt: new Date(user.createdAt),
      }));

    data = data.sort((a: any, b: any) => {
      let aValue, bValue;

      if (searchFields.includes(sortField)) {
        aValue = a[sortField];
        bValue = b[sortField];
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

    return data;
  }, [search, searchField, sortField, sortOrder, users]);

  // 운영진 데이터 필터 및 페이지네이션
  const admins = useMemo(() => {
    return filteredData.filter((user) => user.grade >= 4);
  }, [filteredData]);

  const adminsToShow = useMemo(() => {
    const startIndex = (adminPage - 1) * adminRowsPerPage;
    const endIndex = startIndex + adminRowsPerPage;
    return admins.slice(startIndex, endIndex);
  }, [admins, adminPage, adminRowsPerPage]);

  const adminPages = Math.ceil(admins.length / adminRowsPerPage);

  // 클랜원 데이터 필터 및 페이지네이션
  const members = useMemo(() => {
    return filteredData.filter((user) => user.grade < 4);
  }, [filteredData]);

  const membersToShow = useMemo(() => {
    const startIndex = (memberPage - 1) * memberRowsPerPage;
    const endIndex = startIndex + memberRowsPerPage;
    return members.slice(startIndex, endIndex);
  }, [members, memberPage, memberRowsPerPage]);

  const memberPages = Math.ceil(members.length / memberRowsPerPage);

  const renderCell = useCallback((user: any, columnKey: Key) => {
    const cellValue = getNestedValue(user, columnKey);

    switch (columnKey) {
      case "nickname":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.name}
            name={cellValue}
          >
            {user.nickname}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "BELO.race":
        return user.BELO && user.BELO.race ? (
          <Chip
            className="capitalize"
            color={statusColorMap[user.BELO.race] || "default"}
            size="sm"
            variant="flat"
          >
            {user.BELO.race}
          </Chip>
        ) : (
          <Chip className="capitalize">Unknown</Chip>
        );
      case "tear":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {user.tear}
          </Chip>
        );
      case "createdAt":
        return <p>{formatDateOnly(user.createdAt)}</p>;
      default:
        return cellValue;
    }
  }, []);

  // Determine columns to use based on user grade
  const userGrade = session?.user?.grade || 0;
  const currentColumns = userGrade >= 4 ? adminColumns : columns;

  return (
    <div className="w-full">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20 ">멤버 명단</a>
      <Card className="w-full m-4">
        <CardBody>
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
          <Tabs aria-label="Options">
            <Tab key="admins" title="운영진">
              <div className="p-4">
                <Table
                  aria-label="Example table with client side pagination"
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={adminPage}
                        total={adminPages}
                        onChange={(page) => setAdminPage(page)}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: "min-h-[222px]",
                  }}
                >
                  <TableHeader columns={currentColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                      >
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={adminsToShow}>
                    {(item) => (
                      <TableRow key={item._id}>
                        {(columnKey) => (
                          <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab key="members" title="클랜원">
              <div className="p-4">
                <Table
                  aria-label="Example table with client side pagination"
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={memberPage}
                        total={memberPages}
                        onChange={(page) => setMemberPage(page)}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: "min-h-[222px]",
                  }}
                >
                  <TableHeader columns={currentColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                      >
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={membersToShow}>
                    {(item) => (
                      <TableRow key={item._id}>
                        {(columnKey) => (
                          <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
