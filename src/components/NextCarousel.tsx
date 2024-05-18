// components/NextCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback, ReactNode } from "react";
import Image from "next/image";

type ImageType = {
  src: string;
  alt: string;
};

interface NextCarouselProps {
  items: ImageType[] | ReactNode[];
  images: boolean;
  aspectRatio?: string;
  autoPlayInterval?: number;
}

const NextCarousel: React.FC<NextCarouselProps> = ({
  items,
  images,
  aspectRatio = "16/9",
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, items.length]);

  useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval, goToNext]);

  return (
    <div className="relative">
      <div className="overflow-hidden" style={{ aspectRatio }}>
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images
            ? (items as ImageType[]).map((item, index) => (
                <div key={index} className="flex-shrink-0 w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1000}
                    height={475}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            : (items as ReactNode[]).map((item, index) => (
                <div key={index} className="flex-shrink-0 w-full h-full">
                  {item}
                </div>
              ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default NextCarousel;
