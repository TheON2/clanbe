import CarouselItem from "./CarouselItem";
import MultiCarousel from "./MultiCarousel";

export interface CarouselItemProps {
  src: string;
  alt: string;
}

interface BannerProps {
  items: CarouselItemProps[];
}

const Banner: React.FC<BannerProps> = ({ items }) => {
  return (
    <div className="w-[1100px] h-[400px]">
      <MultiCarousel>
        {items.map((item, index) => (
          <CarouselItem key={index} src={item.src} alt={item.alt} />
        ))}
      </MultiCarousel>
    </div>
  );
};

export default Banner;
