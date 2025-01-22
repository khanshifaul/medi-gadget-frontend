import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const inspirationContent = {
  title: "Discover the Future of Health: 50+ Innovative Medical Gadgets",
  description:
    "Dive into our latest blog post where we explore groundbreaking medical gadgets that are transforming healthcare and enhancing well-being. From wearable devices to telemedicine solutions, find out how technology is shaping the future of health.",
  buttonText: "Explore More",
  imageUrl: "/Images/hero-image/Blog_Inspiration.jpg",
};

const InspirationSection = () => {
  return (
    <div className="md:container mx-auto my-12">
      <div className="md:flex md:flex-row justify-start items-center bg-accent text-accent-foreground rounded p-4">
        <div className="flex flex-col justify-center items-start gap-5 basis-1/3">
          <h2 className="font-bold text-3xl">{inspirationContent.title}</h2>
          <p className="font-semibold text-muted">
            {inspirationContent.description}
          </p>
          <Button
            size={"lg"}
            className="w-fit bg-primary text-2xl rounded-none p-6"
          >
            <Link href={"/blog"}>{inspirationContent.buttonText}</Link>
          </Button>
        </div>
        <div className="basis-2/3">
          <Image
            src={inspirationContent.imageUrl}
            alt="Innovative Medical Gadgets"
            className="object-cover object-center w-full h-full"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default InspirationSection;
