"use client";

import {
  Card,
  CardHeader,
  Image,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import NextCarousel from "./NextCarousel";
import styles from "../styles/style.module.css";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDailyPoint } from "@/service/point";
import DailyPointModal from "./DailyPointModal";

export interface CarouselItemProps {
  src: string;
  alt: string;
}

const bannerItems = [
  {
    src: "https://upload3.inven.co.kr/upload/2024/04/10/bbs/i015769532273.gif",
    alt: "Copy link",
  },
  {
    src: "/후원.png",
    alt: "Edit file",
  },
];

const Banner: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [hydrated, setHydrated] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [dailyPoint, setDailyPoint] = useState(0);
  const {
    isOpen: dailyIsOpen,
    onOpen: dailyOnOpen,
    onClose: dailyOnClose,
  } = useDisclosure();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn && session) {
      getDailyLoginPoint(session.user?.nickname as string);
    }
  }, [session, isLoggedIn]);

  const getDailyLoginPoint = async (nickname: string) => {
    try {
      const { point } = await getDailyPoint(nickname);
      if (point) {
        setDailyPoint(point);
        dailyOnOpen();
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <DailyPointModal
        point={dailyPoint}
        isOpen={dailyIsOpen}
        onClose={dailyOnClose}
      />
      <NextCarousel
        images={true}
        items={bannerItems}
        aspectRatio="26/9"
        autoPlayInterval={10000}
      />
    </div>
  );
};

export default Banner;
