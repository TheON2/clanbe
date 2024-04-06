import Image from "next/image";
import React from "react";
import { CarouselItemProps } from "./Banner";

const CarouselItem: React.FC<CarouselItemProps> = ({ src, alt }) => {
  return (
    <div className="relative min-h-[200px] max-h-[400px]">
      <Image alt={alt} src={src} layout="fill" objectFit="cover" />
    </div>
  );
};

export default CarouselItem;
