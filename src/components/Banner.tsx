"use client";

import { Card, CardHeader, Image, Link } from "@nextui-org/react";
import NextCarousel from "./NextCarousel";
import styles from "../styles/style.module.css";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <NextCarousel
        images={true}
        items={bannerItems}
        aspectRatio="26/9"
        autoPlayInterval={10000}
      />
      <div className="flex flex-wrap items-center justify-center gap-2 w-full overflow-auto">
        <div
          className={`w-full md:w-1/2 h-[350px] overflow-y-auto ${styles.customCard} flex flex-col gap-2`}
        >
          <Card>
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 md:w-2/5 w-3/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/ks/ksmo54/ksmo54.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">구라미스</p>
                  <p className="font-bold text-md">스트리머</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:w-3/5 w-2/5">
                <p className="font-bold text-xl">방송국 주소</p>
                <Link
                  className="font-bold text-sm cursor-pointer"
                  href="https://bj.afreecatv.com/ksmo54"
                >
                  {isMobile ? "바로가기" : "https://bj.afreecatv.com/ksmo54"}
                </Link>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 md:w-2/5 w-3/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://profile.img.afreecatv.com/LOGO/eh/ehdnjs1111/ehdnjs1111.jpg?dummy=1716366745576"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">라으페</p>
                  <p className="font-bold text-md">해설BJ</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:w-3/5 w-2/5">
                <p className="font-bold text-xl">방송국 주소</p>
                <Link
                  className="font-bold text-sm cursor-pointer"
                  href="https://bj.afreecatv.com/ehdnjs1111"
                >
                  {isMobile
                    ? "바로가기"
                    : "https://bj.afreecatv.com/ehdnjs1111"}
                </Link>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-wrap items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 md:w-2/5 w-3/5">
                <div className="w-24 h-24 rounded-full flex justify-center items-center">
                  <Image
                    alt="nextui logo"
                    src="https://i.pinimg.com/736x/69/6c/28/696c28e1ac1e53b7da2747a504c0e144.jpg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-2">
                  <p className="font-bold text-xl">잡 지</p>
                  <p className="font-bold text-md">해설BJ</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:w-3/5 w-2/5">
                <p className="font-bold text-xl">방송국 주소</p>
                <Link
                  className="font-bold text-sm cursor-pointer"
                  href="https://bj.afreecatv.com/lycosc"
                >
                  {isMobile ? "바로가기" : "https://bj.afreecatv.com/lycosc"}
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div
          className={`w-full md:w-1/2 h-[350px] ${styles.customCard} flex flex-col gap-2 items-center justify-center`}
        >
          <Card className="w-full h-[350px] flex items-center justify-center">
            <CardHeader>VOD 다시보기</CardHeader>
            <div className="flex justify-center items-center w-full">
              <div>
                <iframe
                  id="afreecatv_player_video"
                  width="350"
                  height="200"
                  src="https://vod.afreecatv.com/player/123390443/embed?autoPlay=false&mutePlay=true"
                  allowFullScreen={true}
                  allow="clipboard-write"
                ></iframe>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Banner;
