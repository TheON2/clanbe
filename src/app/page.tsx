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
import Image from "next/image";
import { useCallback } from "react";
import { EditIcon } from "../../public/EditIcon";
import { DeleteIcon } from "../../public/DeleteIcon";
import { EyeIcon } from "../../public/EyeIcon";
import { columns, users } from "../../public/data";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
import Upcoming from "@/components/Upcoming";
import PublicPosts from "@/components/PublicPosts";
import PlayerPosts from "@/components/PlayerPosts";

export default function HomePage() {
  const statusColorMap: any = {
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

  const bannerItems = [
    {
      src: "/후원.png",
      alt: "New file",
    },
    {
      src: "/후원.png",
      alt: "Copy link",
    },
    {
      src: "/후원.png",
      alt: "Edit file",
    },
    {
      src: "/후원.png",
      alt: "Delete file",
    },
  ];

  const renderCell = useCallback(
    (user: any, columnKey: any) => {
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
    },
    [statusColorMap]
  );

  return (
    <div className="">
      <Banner items={bannerItems} />
      <Divider className="my-4" />
      <div className="flex flex-wrap gap-2 justify-center">
        <Notice />
        <Upcoming />
        <PublicPosts />
        <PlayerPosts />
      </div>
    </div>
  );
}
