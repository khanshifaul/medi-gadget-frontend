"use client";

import { GET_PRODUCTS } from "@/app/api/graphql/queries";
import Pagination from "@/components/common/pagination";
import ProductCard from "@/components/common/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/types";
import { useQuery } from "@apollo/client";
import { Suspense, useMemo, useState } from "react";

const ShopProductTable = ({
  selectedCategories = [],
}: {
  selectedCategories: string[];
}) => {
  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const products: IProduct[] = useMemo(() => data?.Products || [], [data]);

  // Filter products based on selected categories
  const filteredProducts = useMemo(
    () =>
      selectedCategories.length
        ? products.filter((product) =>
            selectedCategories.includes(product.category.name)
          )
        : products,
    [products, selectedCategories]
  );

  // Calculate the range of products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="md:container mx-auto">
      {loading && <p className="text-center py-6">Loading...</p>}
      {error && <p className="text-center py-6">Error: {error.message}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center py-6">
          No products found for the selected categories.
        </p>
      )}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 px-4">
        {currentProducts.map((product) => (
          <Suspense
            key={product.id}
            fallback={<Skeleton className="bg-muted rounded h-auto w-auto" />}
          >
            <ProductCard
              id={product.id}
              images={product.images}
              name={product.name}
              sku={product.sku}
              regularPrice={product.regularPrice}
              discount={product.discount}
              offerPrice={product.offerPrice}
              category={{
                id: product.category.id,
                name: product.category.name,
              }}
              subcategory={{
                id: product.subcategory.id,
                name: product.subcategory.name,
              }}
            />
          </Suspense>
        ))}
      </div>
      <div className="my-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => setCurrentPage(1)}
        >
          Back to Top
        </Button>
      </div>
    </div>
  );
};

export default ShopProductTable;
