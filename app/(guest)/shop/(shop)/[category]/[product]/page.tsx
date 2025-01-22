"use client";
import { GET_PRODUCT } from "@/app/api/graphql/queries";
import SquareButton from "@/components/common/btn/square-btn";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addProductToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IProduct } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const params = useParams();
  const productId = params?.product;
  const dispatch = useAppDispatch();

  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { productId: productId },
  });

  const product: IProduct | undefined = data?.Product;

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addProductToCart({
          id: product.id,
          name: product.name,
          sku: product.sku,
          image: product.images?.[0] ?? "",
          price: product.offerPrice,
          quantity: 1,
          subtotal: product.offerPrice * 1,
        })
      );
    }
  };

  const handleAddToWishlist = () => {
    // Implement add to wishlist logic
    console.log("Add to Wishlist clicked");
  };

  const handleCompare = () => {
    // Implement compare logic
    console.log("Compare clicked");
  };

  return (
    <section className="container mx-auto w-full flex flex-col pb-12">
      <Card className="bg-accent flex flex-col gap-3 w-full p-3 relative">
        <CardContent className="flex flex-col p-3">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : product ? (
            <div className="flex flex-col w-full mx-auto gap-5">
              <div className="text-3xl font-semibold self-center whitespace-nowrap border-b-2">
                {product.name}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                  <div className="flex flex-col gap-2 mt-4">
                    <SquareButton
                      icon="cart"
                      onClick={handleAddToCart}
                      className="w-12 h-12 p-0 text-primary hover:border-white"
                    />
                    <SquareButton
                      icon="wishlist"
                      onClick={handleAddToWishlist}
                      className="w-12 h-12 p-0 text-primary hover:border-white"
                    />
                    <SquareButton
                      icon="compare"
                      onClick={handleCompare}
                      className="w-12 h-12 p-0 text-primary hover:border-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-lg font-medium text-nowrap">
                    SKU: {product.sku}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Price: BDT. {product.offerPrice.toFixed(2)}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap line-through">
                    Price: BDT. {product.regularPrice.toFixed(2)}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Stock: {product.stock}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Status: {product.status}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Category: {product.category?.name}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Subcategory: {product.subcategory?.name}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap flex gap-2">
                    Tags:
                    {product.tags.map((tag) => (
                      <span key={tag} className="bg-gray-900 px-3 rounded-xl">
                        {tag}
                      </span>
                    ))}
                  </Label>
                  <Label className="text-lg font-medium text-nowrap">
                    Details: {product.details}
                  </Label>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">Product not found</div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
export default ProductDetail;
