"use client";

import { Card, CardHeader, Image, Link } from "@nextui-org/react";
import NextCarousel from "./NextCarousel";
import styles from "../styles/style.module.css";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
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
