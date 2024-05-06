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
  ButtonGroup,
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
import { User as MyUser } from "next-auth";

export default function ProfileComponent(user: any) {
  const [isEditable, setIsEditable] = useState(false);
  const [signUpState, setSignUpState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
  });
  const [editState, setEditState] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    name: false,
    kakao: false,
    birth: false,
    race: false,
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
  });

  const handleRaceClick = (race: string) => {
    setSignUpState((prev) => ({
      ...prev,
      race: race,
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ID 유효성 검사
    if (name === "nickname") {
      if (value.length > 0 && value.length < 2) {
        setError((prev) => ({
          ...prev,
          nickname: "닉네임은 2자 이상이어야 합니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, nickname: "" }));
      }
    }

    if (name === "password") {
      if (value.length > 0 && value.length < 8) {
        setError((prev) => ({
          ...prev,
          password: "비밀번호는 8자 이상이어야 합니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, password: "" }));
      }
    }

    if (name === "passwordConfirm") {
      if (
        signUpState.password.length > 0 &&
        value.length > 0 &&
        value !== signUpState.password
      ) {
        setError((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setError((prev) => ({ ...prev, passwordConfirm: "" }));
      }
    }

    if (name === "birth") {
      if (value.length === 0) {
        setError((prev) => ({
          ...prev,
          birth: "생일을 선택해 주세요",
        }));
      } else {
        setError((prev) => ({ ...prev, birth: "" }));
      }
    }

    if (name === "race") {
      if (value.length === 0) {
        setError((prev) => ({
          ...prev,
          race: "종족을 선택해 주세요",
        }));
      } else {
        setError((prev) => ({ ...prev, race: "" }));
      }
    }
  };

  return (
    <div className="w-full">
      <p>프로필 페이지</p>
      <div className="w-full flex gap-2 mt-4">
        <Card className="w-1/2 flex flex-col items-center ">
          <Input
            type="email"
            name="email"
            label="Email"
            labelPlacement={"outside"}
            placeholder="Email을 입력해주세요."
            value={signUpState.email}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.email.length >= 1}
            errorMessage={error.email}
          />
          <Input
            type="password"
            name="password"
            label="비밀번호"
            labelPlacement={"outside"}
            placeholder="비밀번호를 입력해주세요. [8자 이상]"
            value={signUpState.password}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.password.length >= 1}
            errorMessage={error.password}
          />
          <Input
            type="password"
            name="passwordConfirm"
            label="비밀번호 확인"
            labelPlacement={"outside"}
            placeholder="비밀번호를 다시한번 입력해주세요."
            value={signUpState.passwordConfirm}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.passwordConfirm.length >= 1}
            errorMessage={error.passwordConfirm}
          />
          <Input
            type="text"
            name="nickname"
            label="닉네임"
            labelPlacement={"outside"}
            value={signUpState.nickname}
            placeholder="클랜닉네임을 입력해주세요. [2~16자]"
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.nickname.length >= 1}
            errorMessage={error.nickname}
          />
          <Input
            type="text"
            name="name"
            label="이름"
            labelPlacement={"outside"}
            placeholder="실제 성명을 입력해주세요."
            value={signUpState.name}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.name.length >= 1}
            errorMessage={error.name}
          />
          <Input
            type="text"
            name="kakao"
            label="카톡아이디"
            labelPlacement={"outside"}
            placeholder="카카오톡 아이디를 입력해주세요."
            value={signUpState.kakao}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.kakao.length >= 1}
            errorMessage={error.kakao}
          />
          <Input
            type="date"
            name="birth"
            label="생일"
            labelPlacement={"outside"}
            placeholder="Enter your email"
            value={signUpState.birth}
            className="py-4 w-3/4"
            size="lg"
            onChange={handleInputChange}
            isInvalid={error.birth.length !== 0}
            errorMessage={error.birth}
          />
          <ButtonGroup className="mb-8">
            <Button
              color={signUpState.race === "z" ? "success" : "default"}
              onClick={() => handleRaceClick("z")}
            >
              저그
            </Button>
            <Divider orientation="vertical" />
            <Button
              color={signUpState.race === "t" ? "success" : "default"}
              onClick={() => handleRaceClick("t")}
            >
              테란
            </Button>
            <Divider orientation="vertical" />
            <Button
              color={signUpState.race === "p" ? "success" : "default"}
              onClick={() => handleRaceClick("p")}
            >
              프로토스
            </Button>
          </ButtonGroup>
        </Card>
        <Card className="w-1/2">
          <Input></Input>
        </Card>
      </div>
    </div>
  );
}
