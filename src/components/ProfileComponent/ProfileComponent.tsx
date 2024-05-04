"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Divider,
  Image,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Tabs,
  Tab,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import {
  DateValue,
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";

export default function ProfileComponent() {
  return (
    <div className="w-full">
      <p>프로필 페이지</p>
      <div className="w-full flex gap-2 mt-4">
        <Card className="w-1/2">
          <Input></Input>
          <Input></Input>
          <Input></Input>
          <Input></Input>
          <Input></Input>
          <Input></Input>
        </Card>
        <Card className="w-1/2">
          <Input></Input>
        </Card>
      </div>
    </div>
  );
}
