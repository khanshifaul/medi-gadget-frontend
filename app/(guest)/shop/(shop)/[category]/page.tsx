"use client";
import { GET_PRODUCTS } from "@/app/api/graphql/queries";
import FeatureBanner from "@/components/common/feature-banner";
import PageBanner from "@/components/common/page-banner";
import ProductCard from "@/components/common/product-card"; // Assuming this is the correct path
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/types";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { Suspense } from "react";
const CategoryPage = () => {
  const param = useParams();

  // Fetch all products using the GET_PRODUCTS query
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const products: IProduct[] = data?.Products || [];

  // Decode the category from URL params
  const categoryFromParams = param.category
    ? Array.isArray(param.category)
      ? param.category[0] // Take the first element if it's an array
      : param.category // Use directly if it's a string
    : null;

  const decodedCategory = categoryFromParams
    ? decodeURIComponent(categoryFromParams)
    : null;

  // Filter the products based on the category from the URL
  const filteredProducts = products.filter(
    (product) =>
      product.category.name.toLowerCase() === decodedCategory?.toLowerCase()
  );

  return (
    <div>
      <main className="md:container mx-auto">
        <PageBanner title={`Shop :: ${decodedCategory}`} />
        <div className="my-6">
          <div className="flex-1">
            {loading && <p className="text-center p-4">Loading products...</p>}
            {error && (
              <p className="text-center p-4">
                Error loading products: {error.message}
              </p>
            )}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
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
                      subcategory={{
                        id: product.subcategory.id,
                        name: product.subcategory.name,
                      }}
                    />
                  </Suspense>
                ))}
              </div>
            )}
            {!loading && !error && filteredProducts.length === 0 && (
              <p>No products found for this category.</p>
            )}
          </div>
        </div>
        <FeatureBanner />
      </main>
    </div>
  );
};

export default CategoryPage;
