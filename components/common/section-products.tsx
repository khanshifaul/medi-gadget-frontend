"use client";
import { GET_PRODUCTS } from "@/app/api/graphql/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "./product-card";

const Products: React.FC = () => {
  const { data, loading, error } = useQuery<{ Products: IProduct[] }>(
    GET_PRODUCTS
  );
  const products = data?.Products || [];
  const router = useRouter();

  return (
    <div className="md:container mx-auto my-12">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Our Products</h1>
          <p className="font-semibold text-lg text-slate-500">
            Our Most Popular Products.
          </p>
        </div>
        {loading && <p className="text-center py-6">Loading...</p>}
        {error && <p className="text-center py-6">Error: {error.message}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center py-6">No products found.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-2 px-2">
            {products.map((product) => (
              <Suspense
                key={product.id}
                fallback={
                  <Skeleton className="bg-muted rounded h-auto w-auto" />
                }
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
                />
              </Suspense>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Button
            variant={"outline"}
            className="rounded-none"
            onClick={() => {
              router.push("/shop");
            }}
          >
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
