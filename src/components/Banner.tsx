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
    <div className="flex flex-col gap-2">
      <NextCarousel
        images={true}
        items={bannerItems}
        aspectRatio="23/9"
        autoPlayInterval={10000}
      />
      {/* <NextCarousel
        images={true}
        items={bannerItems}
        aspectRatio="21/9"
        autoPlayInterval={10000}
      /> */}
    </div>
  );
};
export default Banner;
