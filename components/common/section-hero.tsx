import HeroItem from "@/components/common/hero-item";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroData = [
  {
    tag: "Exclusive Offer",
    title: "Explore MediGadget's Latest Innovations",
    details:
      "Discover cutting-edge medical gadgets designed to enhance your health and well-being. Limited time offer!",
    bgimg: "/Images/hero-image/medigadget-promotion-background.webp",
    bgimgMobile:
      "/Images/hero-image/medigadget-promotion-background-mobile.webp",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    tag: "Ambulance Booking",
    title: "Find and Book Ambulances Easily",
    details:
      "Quickly locate and book ambulances in your area for emergency medical services.",
    bgimg: "/Images/hero-image/ambulance-booking-background.webp",
    bgimgMobile: "/Images/hero-image/ambulance-booking-background-mobile.webp",
    buttonText: "Book Now",
    buttonLink: "/ambulance",
  },
];

const HeroSection = () => {
  return (
    <div className="md:container mx-auto my-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full m-0 p-0"
      >
        <CarouselPrevious className="left-2 z-10 bg-transparent" />
        <CarouselContent>
          {heroData.map((item, index) => (
            <HeroItem
              key={index}
              tag={item.tag}
              title={item.title}
              details={item.details}
              bgimg={item.bgimg}
              bgimgMobile={item.bgimgMobile}
              buttonText={item.buttonText}
              buttonLink={item.buttonLink}
            />
          ))}
        </CarouselContent>
        <CarouselNext className="right-2 z-10 bg-transparent" />
      </Carousel>
    </div>
  );
};

export default HeroSection;
