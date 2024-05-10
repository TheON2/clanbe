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
  tabs,
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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostCardComponent from "./PostCardComponent";
import { formatDateOnly, formatRelativeDate } from "@/utils/dateUtils";
import CommentCard from "./CommentCard/CommentCard";
import PostCommentCard from "./CommentCard/ProfileCommentCard";
import { Post } from "../../types/types";

export default function ProfileComponent({ user, posts, comments }: any) {
  const router = useRouter();
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const loginUser = session?.user;
  const [selected, setSelected] = useState<string | number>("PROFILE");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [signUpState, setSignUpState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
    avatar: "",
  });
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    kakao: "",
    birth: "",
    race: "",
    avatar: "",
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

  function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("email", signUpState.email);

    fetch("/api/user/uploadProfile", {
      // 이미지를 업로드하는 API 경로를 지정하세요.
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.uploaded) {
          setSignUpState((prev) => ({
            ...prev,
            avatar: data.url, // 상태 업데이트
          }));
        } else {
          console.error("업로드 실패:", data.error);
        }
      })
      .catch((error) => {
        console.error("업로드 중 오류 발생:", error);
      });
  }

  const updateProfile = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpState }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("데이터 갱신을 위해 재로그인 합니다.");
        setSelected("PROFILE");
        signOut();
        window.location.href = `/`;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const updatePassword = async () => {
    if (error.password.length > 1 || error.passwordConfirm.length > 1) return;
    try {
      const response = await fetch("/api/userprofile/updatepw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpState }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("비밀번호 변경 성공");
        setSelected("PROFILE");
        // 비밀번호 필드 초기화
        setSignUpState((prev) => ({
          ...prev,
          password: "",
          passwordConfirm: "",
        }));
        setIsEditPassword(false); // 비밀번호 변경 후 프로필 수정 모드로 전환
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setSignUpState({
        email: user.email || "",
        password: "", // Generally, we don't preload passwords
        passwordConfirm: "",
        nickname: user.nickname || "",
        name: user.name || "",
        kakao: user.kakao || "",
        birth: user.birth
          ? new Date(user.birth).toISOString().substring(0, 10)
          : "", // Converting the date into YYYY-MM-DD format for input[type=date]
        race: user.BELO ? user.BELO.race || "" : "",
        avatar: user.avatar || "",
      });
      setUserState({
        email: user.email || "",
        password: "", // Generally, we don't preload passwords
        passwordConfirm: "",
        nickname: user.nickname || "",
        name: user.name || "",
        kakao: user.kakao || "",
        birth: user.birth
          ? new Date(user.birth).toISOString().substring(0, 10)
          : "", // Converting the date into YYYY-MM-DD format for input[type=date]
        race: user.BELO ? user.BELO.race || "" : "",
        avatar: user.avatar || "",
      });
    }
  }, [user]); // Depend on the user prop

  console.log(user);

  useEffect(() => {
    if (status === "loading") return; // 세션 로딩 중인 경우 대기

    if (status === "unauthenticated") {
      // 로그인 되지 않았다면 로그인 페이지로 리다이렉트
      alert("로그인 후 이용가능합니다.");
      router.push("/AUTH/signin");
    }
  }, [router, status]);

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center">
        <Card className="w-min-[370px] md:w-1/2 px-2 h-[850px]">
          <Tabs
            aria-label="Profile Sections"
            className="w-full mt-2 ml-2"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="PROFILE" title="PROFILE" className="text-left">
              <div className="mx-auto mt-4 md:w-1/2 flex flex-col items-center">
                <div className="flex items-center m-2 gap-4 mt-8">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar
                    src={signUpState.avatar}
                    className="w-20 h-20 text-large"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{user.nickname}</p>
                    <p className="font-bold text-md text-blue">@{user.name}</p>
                  </div>
                </div>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  labelPlacement={"outside"}
                  placeholder="Email을 입력해주세요."
                  value={userState.email}
                  className="py-4 w-[250px]"
                  size="lg"
                  onChange={handleInputChange}
                  isInvalid={error.email.length >= 1}
                  errorMessage={error.email}
                  isReadOnly={true}
                />
                <Input
                  type="text"
                  name="nickname"
                  label="닉네임"
                  labelPlacement={"outside"}
                  value={userState.nickname}
                  placeholder="클랜닉네임을 입력해주세요. [2~16자]"
                  className="py-4 w-[250px]"
                  size="lg"
                  onChange={handleInputChange}
                  isInvalid={error.nickname.length >= 1}
                  errorMessage={error.nickname}
                  isReadOnly={true}
                />
                <Input
                  type="text"
                  name="name"
                  label="이름"
                  labelPlacement={"outside"}
                  placeholder="실제 성명을 입력해주세요."
                  value={userState.name}
                  className="py-4 w-[250px]"
                  size="lg"
                  onChange={handleInputChange}
                  isInvalid={error.name.length >= 1}
                  errorMessage={error.name}
                  isReadOnly={true}
                />
                <Input
                  type="text"
                  name="kakao"
                  label="카톡아이디"
                  labelPlacement={"outside"}
                  placeholder="카카오톡 아이디를 입력해주세요."
                  value={userState.kakao}
                  className="py-4 w-[250px]"
                  size="lg"
                  onChange={handleInputChange}
                  isInvalid={error.kakao.length >= 1}
                  errorMessage={error.kakao}
                  isReadOnly={true}
                />
                <Input
                  type="date"
                  name="birth"
                  label="생일"
                  labelPlacement={"outside"}
                  placeholder="Enter your email"
                  value={userState.birth}
                  className="py-4 w-[250px]"
                  size="lg"
                  onChange={handleInputChange}
                  isInvalid={error.birth.length !== 0}
                  errorMessage={error.birth}
                  isReadOnly={true}
                />
                <ButtonGroup className="mb-8 mt-4">
                  <Button
                    color={userState.race === "z" ? "success" : "default"}
                    //onClick={() => handleRaceClick("z")}
                  >
                    저그
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    color={userState.race === "t" ? "success" : "default"}
                    //onClick={() => handleRaceClick("t")}
                  >
                    테란
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    color={userState.race === "p" ? "success" : "default"}
                    //onClick={() => handleRaceClick("p")}
                  >
                    프로토스
                  </Button>
                </ButtonGroup>
              </div>
            </Tab>
            {session && session.user && session.user.email === user.email && (
              <Tab key="UPDATE" title="UPDATE" className="text-left">
                <div className="mx-auto mt-4 md:w-1/2 flex flex-col items-center">
                  <div className="flex items-center m-2 gap-4 mt-8">
                    {/* Avatar 위치를 조정합니다. */}
                    <Avatar
                      src={signUpState.avatar}
                      className="w-20 h-20 text-large"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-2xl">{user.nickname}</p>
                      <p className="font-bold text-md text-blue">
                        @{user.name}
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-[200px]"
                  />
                  {!isEditPassword ? (
                    <>
                      <Input
                        type="text"
                        name="nickname"
                        label="닉네임"
                        labelPlacement={"outside"}
                        value={signUpState.nickname}
                        placeholder="클랜닉네임을 입력해주세요. [2~16자]"
                        className="py-4 w-[250px] "
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.nickname.length >= 1}
                        errorMessage={error.nickname}
                        variant="bordered"
                      />
                      <Input
                        type="text"
                        name="name"
                        label="이름"
                        labelPlacement={"outside"}
                        placeholder="실제 성명을 입력해주세요."
                        value={signUpState.name}
                        className="py-4 w-[250px]"
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.name.length >= 1}
                        errorMessage={error.name}
                        variant="bordered"
                      />
                      <Input
                        type="text"
                        name="kakao"
                        label="카톡아이디"
                        labelPlacement={"outside"}
                        placeholder="카카오톡 아이디를 입력해주세요."
                        value={signUpState.kakao}
                        className="py-4 w-[250px]"
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.kakao.length >= 1}
                        errorMessage={error.kakao}
                        variant="bordered"
                      />
                      <Input
                        type="date"
                        name="birth"
                        label="생일"
                        labelPlacement={"outside"}
                        placeholder="Enter your email"
                        value={signUpState.birth}
                        className="py-4 w-[250px]"
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.birth.length !== 0}
                        errorMessage={error.birth}
                        variant="bordered"
                      />
                      <Button
                        className="w-[200px] my-4"
                        color="secondary"
                        onPress={() => {
                          setIsEditPassword(true);
                        }}
                      >
                        비밀번호 변경
                      </Button>
                      <Button
                        className="w-[200px] my-4"
                        color="primary"
                        onPress={updateProfile}
                      >
                        프로필 수정
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        type="password"
                        name="password"
                        label="비밀번호"
                        labelPlacement={"outside"}
                        value={signUpState.password}
                        placeholder="비밀번호"
                        className="py-4 w-[250px] "
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.password.length >= 1}
                        errorMessage={error.password}
                        variant="bordered"
                      />
                      <Input
                        type="password"
                        name="passwordConfirm"
                        label="비밀번호 확인"
                        labelPlacement={"outside"}
                        placeholder="비밀번호 확인"
                        value={signUpState.passwordConfirm}
                        className="py-4 w-[250px]"
                        size="lg"
                        onChange={handleInputChange}
                        isInvalid={error.passwordConfirm.length >= 1}
                        errorMessage={error.passwordConfirm}
                        variant="bordered"
                      />
                      <Button
                        className="w-[200px] my-4"
                        color="secondary"
                        onPress={() => {
                          setIsEditPassword(false);
                          setSignUpState((prev) => ({
                            ...prev,
                            password: "",
                            passwordConfirm: "",
                          }));
                        }}
                      >
                        프로필 수정
                      </Button>
                      <Button
                        className="w-[200px] my-4"
                        color="primary"
                        onPress={updatePassword}
                      >
                        비밀번호 변경
                      </Button>
                    </>
                  )}
                </div>
              </Tab>
            )}
            <Tab key="POSTS" title="POSTS" className="text-left ">
              작성글 : {posts.length} 개
              <div className="overflow-auto h-[700px]">
                {posts.map((post: Post, index: string) => (
                  <PostCardComponent
                    key={index}
                    title={post.title}
                    author={post.author}
                    views={post.view}
                    date={formatRelativeDate(post.createdAt)}
                    id={post._id}
                    category={post.category}
                  />
                ))}
              </div>
            </Tab>
            <Tab key="COMMENTS" title="COMMENTS" className="text-left">
              작성 댓글 : {comments.length} 개
              <div className="overflow-auto h-[700px]">
                {comments.map((comment: any) => (
                  <PostCommentCard
                    key={comment._id} // key prop 추가
                    commentid={comment._id}
                    postid={comment.postId}
                    author={comment.author}
                    text={comment.text}
                    date={comment.createdAt}
                    category={comment.category}
                    postTitle={comment.postTitle}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
