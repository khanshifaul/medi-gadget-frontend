"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface HeroProps {
  tag: string;
  title: string;
  details: string;
  buttonLink?: string;
  bgimg: string;
  bgimgMobile: string;
  buttonText?: string;
}

const HeroItem = ({
  tag,
  title,
  details,
  buttonLink = "/shop",
  bgimg,
  bgimgMobile,
  buttonText = "Buy Now",
}: HeroProps) => {
  return (
    <CarouselItem className="w-full h-[80vh] flex md:justify-end items-end p-0">
      <div className="relative min-w-full min-h-full">
        <Suspense
          fallback={<Skeleton className="bg-muted rounded h-auto w-auto" />}
        >
          <Image
            src={bgimg}
            alt={title}
            fill
            className="absolute object-fit dark:backdrop-brightness-30 hidden md:block"
          />
          <Image
            src={bgimgMobile}
            alt={title}
            fill
            className="absolute object-fit dark:backdrop-brightness-30 md:hidden"
          />
        </Suspense>
        <div className="absolute bottom-0 right-0 rounded-xl w-fit md:max-w-[640px] h-fit">
          <Card className="bg-secondary text-black opacity-80 m-6">
            <CardContent className="p-6">
              <h2 className="font-semibold text-primary/40">{tag}</h2>
              <h1 className="text-2xl font-semibold text-primary">{title}</h1>
              <p className="text-md font-medium text-ellipsis text-primary/60">
                {details}
              </p>
              {buttonLink && (
                <Button
                  size={"lg"}
                  className="w-fit light:bg-gray-300 dark:bg-gray-900 light:text-black dark:text-white hover:text-black hover:bg-secondary font-semibold text-2xl rounded-none p-6"
                >
                  <Link href={buttonLink}>{buttonText}</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CarouselItem>
  );
};

export default HeroItem;
