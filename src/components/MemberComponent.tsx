"use client";

import MultiCarousel from "@/components/MultiCarousel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  Listbox,
  ListboxItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  Pagination,
} from "@nextui-org/react";
import { User as MyUser } from "next-auth";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../../public/EditIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { EyeIcon } from "../../public/EyeIcon";
import { admins } from "../../public/data";
import { formatDate, formatDateOnly } from "@/utils/dateUtils";
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

function getNestedValue(obj: any, path: any) {
  return path.split(".").reduce((acc: any, part: any) => acc && acc[part], obj);
}

export const columns = [
  { name: "NAME", uid: "nickname" },
  { name: "종족", uid: "BELO.race" },
  { name: "TEAR", uid: "tear" },
  { name: "ROLE", uid: "role" },
  { name: "가입일자", uid: "createdAt" },
];

export default function MemberComponent({ users }: MemberComponentProps) {
  // 운영진 페이지네이션
  const [adminPage, setAdminPage] = useState(1);
  const adminRowsPerPage = 5;

  // 클랜원 페이지네이션
  const [memberPage, setMemberPage] = useState(1);
  const memberRowsPerPage = 10;

  // 운영진 데이터 필터 및 페이지네이션
  const admins = useMemo(() => {
    return users.filter((user) => user.grade >= 4);
  }, [users]);

  const adminsToShow = useMemo(() => {
    const startIndex = (adminPage - 1) * adminRowsPerPage;
    const endIndex = startIndex + adminRowsPerPage;
    return admins.slice(startIndex, endIndex);
  }, [admins, adminPage, adminRowsPerPage]);

  const adminPages = Math.ceil(admins.length / adminRowsPerPage);

  // 클랜원 데이터 필터 및 페이지네이션
  const members = useMemo(() => {
    return users.filter((user) => user.grade < 4);
  }, [users]);

  const membersToShow = useMemo(() => {
    const startIndex = (memberPage - 1) * memberRowsPerPage;
    const endIndex = startIndex + memberRowsPerPage;
    return members.slice(startIndex, endIndex);
  }, [members, memberPage, memberRowsPerPage]);

  const memberPages = Math.ceil(members.length / memberRowsPerPage);

  const renderCell = useCallback(
    (user: any, columnKey: Key) => {
      // 중첩된 키에 대한 접근을 처리합니다.
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
          // 먼저 user.BELO와 user.BELO.race가 정의되어 있는지 확인
          if (user.BELO && user.BELO.race) {
            return (
              <Chip
                className="capitalize"
                color={statusColorMap[user.BELO.race] || "default"} // 기본 색상으로 'default' 설정
                size="sm"
                variant="flat"
              >
                {user.BELO.race}
              </Chip>
            );
          } else {
            // BELO.race 정보가 없는 경우 다른 UI 요소를 표시하거나 빈 문자열 반환
            return <Chip className="capitalize">Unknown</Chip>;
          }
        case "tear":
          return (
            <Chip
              className="capitalize"
              //color={statusColorMap[user.BELO.race] || "default"} // 기본 색상으로 'default' 설정
              size="sm"
              variant="flat"
            >
              {user.tear}
            </Chip>
          );
        case "createdAt":
          return <p>{formatDateOnly(user.createdAt)}</p>;
        default:
          return cellValue;
      }
    },
    [statusColorMap]
  );

  return (
    <div className="w-full">
      <a className="font-bold text-xl sm:text-3xl px-4 mb-20 ">멤버 명단</a>
      <Card className="w-full m-4">
        <CardBody>
          <div className="p-4">
            <a className="block font-bold text-xl sm:text-3xl text-center mb-4">
              운영진
            </a>
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
              <TableHeader columns={columns}>
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
          <div className="p-4">
            <a className="block font-bold text-xl sm:text-3xl text-center mb-4">
              클랜원
            </a>
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
              <TableHeader columns={columns}>
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
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
