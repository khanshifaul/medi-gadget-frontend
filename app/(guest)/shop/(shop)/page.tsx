"use client";
import { GET_CATEGORIES } from "@/app/api/graphql/queries";
import FeatureBanner from "@/components/common/feature-banner";
import FilterNav from "@/components/common/filter-nav";
import PageBanner from "@/components/common/page-banner";
import ProductFilter from "@/components/common/product-filter";
import ShopProductTable from "@/components/common/shop-product-table";
import { Button } from "@/components/ui/button";
import {
  closeFilter,
  selectFilterIsOpen,
} from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IProductCategory } from "@/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const filterIsOpen = useAppSelector(selectFilterIsOpen);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch categories using the GET_CATEGORIES query
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories: string[] =
    data?.productCategories.map(
      (category: IProductCategory) => category.name
    ) || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  return (
    <div>
      <main className="md:container mx-auto">
        <PageBanner title="Shop" />
        <div className="sticky top-16 z-20">
          <FilterNav />
        </div>
        <div className="flex gap-2 py-2">
          <div
            className={`w-full min-h-full p-2 md:w-48 z-20 md:z-10 fixed left-0 top-48 md:top-0 md:relative md:translate-x-0 transition-all md:transition-none bg-background text-foreground ${
              filterIsOpen ? "animate-left-right" : "-translate-x-full"
            }`}
          >
            <div className="flex md:hidden justify-end">
              <Button
                variant={"none"}
                onClick={() => {
                  dispatch(closeFilter());
                }}
              >
                <MdClose className="text-2xl" />
              </Button>
            </div>
            {loading && <p>Loading categories...</p>}
            {error && <p>Error loading categories: {error.message}</p>}
            {!loading && !error && (
              <ProductFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            )}
          </div>
          <div className="flex-1">
            <ShopProductTable selectedCategories={selectedCategories} />
          </div>
        </div>
        <FeatureBanner />
      </main>
    </div>
  );
};

export default ShopPage;
