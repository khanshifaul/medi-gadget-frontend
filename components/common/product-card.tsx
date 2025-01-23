"use client";

import SquareButton from "@/components/common/btn/square-btn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { addProductToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  sku: string;
  images: string[];
  regularPrice: number;
  discount: number;
  offerPrice: number;
  category: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
  };
}

const ProductCard = ({
  id,
  name,
  sku,
  images,
  regularPrice,
  discount,
  offerPrice,
  category,
  subcategory,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="p-0 rounded-sm w-full h-full">
      <CardHeader className="relative flex p-0">
        <Image
          src={images[0]}
          alt={name}
          className="aspect-square object-cover object-center w-full h-full"
          width="500"
          height="500"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-center items-center font-medium whitespace-nowrap py-1 md:py-3 rounded-full w-8 h-8 md:w-12 md:h-12">
          {discount}%
        </div>
      </CardHeader>
      <CardContent className="relative flex p-0 w-full">
        <div className="flex flex-col p-2 gap-1">
          <div className="text-foreground/35 text-sm md:text-base font-medium mt-1 max-h-12">
            {category.name} / {subcategory.name}
          </div>
          <Link href={`/shop/${category.name}/${id}`}>
            <div
              className="text-md md:text-lg font-semibold hover:underline line-clamp-2 max-h-12"
              title={name}
            >
              {name}
            </div>
          </Link>
          <div className="w-full min-w-fit flex flex-col flex-nowrap mt-1 md:mt-2">
            <p className="text-foreground/35 text-sm md:text-base line-through">
              {"BDT " + regularPrice.toFixed(2)}
            </p>
            <p className="text-primary text-lg md:text-xl font-semibold text-nowrap">
              {"BDT " + offerPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="absolute top-2 right-2 w-8 md:w-12 flex flex-col items-center justify-center gap-1 md:gap-2">
          <SquareButton
            icon="cart"
            onClick={() => {
              dispatch(
                addProductToCart({
                  id,
                  name,
                  sku,
                  image: images[0],
                  price: offerPrice,
                  quantity: 1,
                  subtotal: offerPrice * 1,
                })
              );
            }}
            className="w-6 h-6 md:w-8 md:h-8 p-0 light:text-black light:bg-white dark:text-white dark:bg-gray-700"
          />
          <SquareButton
            icon="compare"
            className="w-6 h-6 md:w-8 md:h-8 p-0 text-primary"
          />
          <SquareButton
            icon="wishlist"
            className="w-6 h-6 md:w-8 md:h-8 p-0 text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
