import Image from "next/image";
import React from "react";
import { CarouselItemProps } from "./Banner";

const CarouselItem: React.FC<CarouselItemProps> = ({ src, alt }) => {
  return (
    <div className="w-full h-[400px]">
      <Image alt={alt} src={src} layout="fill" />
    </div>
  );
};

export default CarouselItem;
