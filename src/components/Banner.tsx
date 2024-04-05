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
    <div className="w-full max-w-[1100px] h-[400px] mx-auto max-2xl:w-[80%] max-2xl:aspect-video">
      <MultiCarousel>
        {items.map((item, index) => (
          <CarouselItem key={index} src={item.src} alt={item.alt} />
        ))}
      </MultiCarousel>
    </div>
  );
};
export default Banner;
