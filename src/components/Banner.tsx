import CarouselItem from "./CarouselItem";
import MultiCarousel from "./MultiCarousel";
import NextCarousel from "./NextCarousel";

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
  return (
    <div>
      <NextCarousel images={bannerItems} />
    </div>
  );
};
export default Banner;
