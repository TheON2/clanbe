import { formatDateOnly } from "@/utils/dateUtils";
import {
  Button,
  Card,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { categoryLabels } from "../../../public/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminPostTab = ({ posts }: any) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const rowsPerPage = 10;

  const fieldLabels: { [key: string]: string } = {
    title: "제목",
    category: "카테고리",
    noticed: "공지",
    view: "조회수",
    createdAt: "날짜",
  };
  const searchFields = useMemo(
    () => ["title", "category", "noticed", "view", "createdAt"],
    []
  );

  const sortFields = ["title", "category", "noticed", "view", "createdAt"];

  const filteredData = useMemo(() => {
    let data = posts.filter((point: any) => {
      if (!searchField) return true;
      return point[searchField]
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    });

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
  }, [search, searchField, sortField, sortOrder, posts, searchFields]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredData]);
  return (
    <div>
      <Card>
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
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>카테고리</TableColumn>
            <TableColumn>제목</TableColumn>
            <TableColumn>공지</TableColumn>
            <TableColumn>조회수</TableColumn>
            <TableColumn>날짜</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>{categoryLabels[item.category]}</TableCell>
                <TableCell>
                  <Link href={`/post/read/${item._id}/${item.category}`}>
                    <p className="text-sm md:text-md hover:text-blue-500 cursor-pointer">
                      {item.title}
                    </p>
                  </Link>
                </TableCell>
                <TableCell>{item.noticed ? "O" : "X"}</TableCell>
                <TableCell>{item.view}</TableCell>
                <TableCell>{formatDateOnly(item.createdAt)}</TableCell>
              </TableRow>
            ))}
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
      </Card>
    </div>
  );
};

export default AdminPostTab;
