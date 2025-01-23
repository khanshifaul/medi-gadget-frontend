"use client";
import { GET_CATEGORIES } from "@/app/api/graphql/queries";
import { IProductCategory } from "@/types";
import { useQuery } from "@apollo/client";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";

const BrowseSection = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories: string[] =
    data?.productCategories.map(
      (category: IProductCategory) => category.name
    ) || [];

  // Reference to the container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    }
  };

  return (
    <div className="md:container mx-auto my-12 ">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Browse MediGadget Range</h1>
          <p className="font-semibold text-lg text-slate-500">
            Explore innovative medical gadgets to enhance your health and
            well-being.
          </p>
        </div>

        <div className="relative">
          <Button
            variant="solid"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer z-10 p-0 aspect-square rounded-full"
            onClick={scrollLeft}
          >
            <ArrowLeftCircle />
          </Button>

          <div
            ref={scrollContainerRef} // Set the reference to the container div
            className="w-full flex  overflow-x-hidden hide-scrollbar text-nowrap"
          >
            <div className="w-full flex justify-center gap-4">
              {loading && (
                <p className="text-center py-6">Loading categories...</p>
              )}
              {error && (
                <p className="text-center py-6">Error: {error.message}</p>
              )}
              {!loading && !error && categories.length === 0 && (
                <p className="text-center py-6">No categories found.</p>
              )}
            </div>
            {!loading &&
              !error &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="light:bg-gray-200 dark:bg-gray-800 flex justify-center items-center p-4 m-2 rounded-md cursor-pointer"
                >
                  <Link href={`/shop/${category}`}>
                    <h2 className="font-semibold text-center">
                      {category.toUpperCase()}
                    </h2>
                  </Link>
                </div>
              ))}
          </div>

          <Button
            variant="solid"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer z-10 p-0 aspect-square rounded-full"
            onClick={scrollRight}
          >
            <ArrowRightCircle />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseSection;
