import CarouselItem from "./CarouselItem";
import MultiCarousel from "./MultiCarousel";
import NextCarousel from "./NextCarousel";

export interface CarouselItemProps {
  src: string;
  alt: string;
}

interface BannerProps {
  items: CarouselItemProps[];
}

const Banner: React.FC<BannerProps> = ({ items }) => {
  return (
    <div className="min-w-[540px] max-w-[1200px] min-h-[300px] mx-auto">
      <NextCarousel images={items} />
    </div>
  );
};
export default Banner;
