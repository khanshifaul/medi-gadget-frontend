import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const browseData = [
  {
    thumbnail: "/Images/category-image/wearable-devices.jpg",
    category: "Wearable Devices",
  },
  {
    thumbnail: "/Images/category-image/health-monitoring.jpg",
    category: "Health Monitoring",
  },
  {
    thumbnail: "/Images/category-image/telemedicine.jpg",
    category: "Telemedicine",
  },
  {
    thumbnail: "/Images/category-image/fitness-trackers.jpg",
    category: "Fitness Trackers",
  },
];

const BrowseSection = () => {
  return (
    <div className="md:container mx-auto my-12">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Browse MediGadget Range</h1>
          <p className="font-semibold text-lg text-slate-500">
            Explore innovative medical gadgets to enhance your health and
            well-being.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-5 overflow-x-auto justify-center">
          {browseData.map((item, index) => {
            return (
              <Card key={index} className="p-0 m-2">
                <Link href={"/shop/" + item.category}>
                  <CardContent className="relative p-0">
                    <div
                      className="relative w-full"
                      style={{ minWidth: "200px", minHeight: "200px" }}
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.category}
                        fill
                        className="rounded dark:backdrop-brightness-30 object-fit"
                      />
                    </div>
                    <div className="absolute bottom-0 bg-accent bg-blur w-full min-h-24 z-20 rounded-b backdrop-blur-sm flex items-center justify-center">
                      <h2 className="text-xl font-semibold text-center p-4 hover:underline">
                        {item.category.toUpperCase()}
                      </h2>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseSection;
