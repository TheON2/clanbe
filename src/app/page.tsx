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
} from "@nextui-org/react";
import { AcmeLogo } from "../../public/AcmeLogo";
import Image from "next/image";
import { useCallback } from "react";
import { EditIcon } from "../../public/EditIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { EyeIcon } from "../../public/EyeIcon";
import { columns, users } from "../../public/data";

export default function HomePage() {
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
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
            color={statusColorMap[user.status]}
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
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursord-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <div className="w-[1100px] h-[400px]">
        <MultiCarousel>
          <div className="w-full h-[400px]">
            <Image alt="Card background" src={"/후원.png"} fill />
          </div>
          <div className="w-full h-[400px]">
            <Image alt="Card background" src={"/후원.png"} fill />
          </div>
          <div className="w-full h-[400px]">
            <Image alt="Card background" src={"/후원.png"} fill />
          </div>
          <div className="w-full h-[400px]">
            <Image alt="Card background" src={"/후원.png"} fill />
          </div>
        </MultiCarousel>
      </div>
      <Divider className="my-4" />
      <div className="flex w-[1100px] flex-wrap justify-center gap-4 my-4">
        <Card className="w-[540px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
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
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[540px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
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
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[540px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
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
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[540px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
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
            <Table aria-label="Example table with custom cells">
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
              <TableBody items={users}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
