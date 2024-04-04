import React from "react";
import { ChevronDown } from "./Icons";

export const aligns = [
  {
    label: "기본",
    value: "기본",
    description: "기본기준으로 게시글을 정렬합니다.",
  },
  {
    label: "날짜",
    value: "날짜",
    description: "게시날짜 순으로 게시글을 정렬합니다.",
  },
  {
    label: "조회수",
    value: "조회수",
    description: "조회수 순으로 게시글을 정렬합니다.",
  },
];

export const tabs = [
  {
    id: "photos",
    label: "Photos",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "music",
    label: "Music",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "videos",
    label: "Videos",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export const searchOption = [
  {
    label: "제목",
    value: "제목",
    description: "제목기준으로 게시글을 검색합니다.",
  },
  {
    label: "내용",
    value: "내용",
    description: "내용 순으로 게시글을 검색합니다.",
  },
  {
    label: "닉네임",
    value: "닉네임",
    description: "닉네임 순으로 게시글을 검색합니다.",
  },
];

export const posts = [
  {
    number: "공지",
    title: "2024, 3월, 3일 공지사항",
    author: "forU",
    date: "24.03.03.",
    views: "68",
  },
  {
    number: "공지",
    title: "2.13 공지사항",
    author: "forU",
    date: "24.02.13.",
    views: "80",
  },
  {
    number: "공지",
    title: "12.16 영업진 회의 공지사항",
    author: "forU",
    date: "22.12.18.",
    views: "290",
  },
  {
    number: "공지",
    title: "06.25 영업진 회의 공지사항",
    author: "JPAPA",
    date: "22.06.27.",
    views: "348",
  },
  {
    number: "34",
    title: "프로모션 진행중",
    author: "hOn",
    date: "22.03.25.",
    views: "106",
  },
  {
    number: "33",
    title: "3.17 영업진회의",
    author: "hOn",
    date: "22.03.18.",
    views: "77",
  },
];

export const columns = [
  { name: "STATUS", uid: "status" },
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
];

export const headerDummy = {
  buttonTitle: "더미메뉴",
  menuItems: [
    {
      title: "더미1번",
      description: "더미임",
      icon: "scale",
    },
    {
      title: "더미2번",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "더미3번",
      description: "더미임",
      icon: "server",
    },
  ],
};

export const headerCLANBE = {
  buttonTitle: "CLANBE",
  menuItems: [
    {
      title: "공지 사항",
      description: "Be클랜의 필수공지사항을 확인 할 수 있습니다.",
      icon: "scale",
    },
    {
      title: "클랜 일정",
      description: "더미임",
      icon: "activity",
    },
    {
      title: "클랜원 명단",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "클랜 규정",
      description:
        "클랜원 활동에 필요한 필수규칙 및 운영방침을 확인 할 수 있습니다.",
      icon: "flash",
    },
    {
      title: "클랜 후원",
      description: "클랜의 활동에 필요한 후원자금에 관련된 게시판 입니다.",
      icon: "flash",
    },
  ],
};

export const headerCOMMUNITY = {
  buttonTitle: "더미메뉴",
  menuItems: [
    {
      title: "더미1번",
      description: "더미임",
      icon: "scale",
    },
    {
      title: "더미2번",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "더미3번",
      description: "더미임",
      icon: "server",
    },
  ],
};

export const headerBELO = {
  buttonTitle: "더미메뉴",
  menuItems: [
    {
      title: "더미1번",
      description: "더미임",
      icon: "scale",
    },
    {
      title: "더미2번",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "더미3번",
      description: "더미임",
      icon: "server",
    },
  ],
};

export const headerLEAGUE = {
  buttonTitle: "더미메뉴",
  menuItems: [
    {
      title: "더미1번",
      description: "더미임",
      icon: "scale",
    },
    {
      title: "더미2번",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "더미3번",
      description: "더미임",
      icon: "server",
    },
  ],
};

export const headerPOINT = {
  buttonTitle: "더미메뉴",
  menuItems: [
    {
      title: "더미1번",
      description: "더미임",
      icon: "scale",
    },
    {
      title: "더미2번",
      description: "더미임",
      icon: "flash",
    },
    {
      title: "더미3번",
      description: "더미임",
      icon: "server",
    },
  ],
};

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 7,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];
