"use client";
import { Button } from "@/components/ui/button";

import DelWishlistBtn from "@/components/common/btn/del-wishlist-btn";
import MoveToCartBtn from "@/components/common/btn/move-to-cart-btn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addProductToCart } from "@/lib/features/cart/cartSlice";
import {
  WishlistItem,
  removeProductFromWishlist,
  selectWishlistIsOpen,
  selectWishlistItems,
  toggleWishlist,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineFavorite } from "react-icons/md";

const WishlistBtn = () => {
  const dispatch = useAppDispatch();
  const wishlistIsOpen = useAppSelector(selectWishlistIsOpen);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const router = useRouter();

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 relative"
          onClick={() => dispatch(toggleWishlist())}
        >
          <MdOutlineFavorite className="text-2xl" />
          {wishlistItems.length > 0 && (
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-destructive rounded-full flex items-center justify-center text-xs font-bold text-white">
              {wishlistItems.length < 10 ? wishlistItems.length : "9+"}
            </div>
          )}
        </Button>
      </SheetTrigger>

      {/* Wishlist Content */}
      <SheetContent
        className={`flex flex-col gap-4 min-h-screen md:min-w-[50vw] min-w-[100vw] fixed top-0 right-0 z-50 transition-all bg-background text-foreground p-4 rounded-r-none ${
          wishlistIsOpen ? "animate-right-left" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <SheetHeader className="flex justify-between items-center bg-accent rounded-md p-3">
          <SheetTitle className="flex items-center gap-2">
            <MdOutlineFavorite className="text-2xl" />
            Wishlist [{wishlistItems.length}]
          </SheetTitle>
        </SheetHeader>

        {/* Wishlist Items */}
        <div className="bg-accent rounded-md p-4 overflow-auto flex-grow">
          {wishlistItems.length > 0 ? (
            <Table className="w-full">
              <TableHeader className="bg-secondary/100 rounded-lg">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlistItems.map((wishlistItem: WishlistItem) => (
                  <TableRow key={wishlistItem.id} className="hover:bg-muted/60">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Image
                          src={wishlistItem.image || "/placeholder.png"}
                          alt={wishlistItem.name || "Product Image"}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-semibold">{wishlistItem.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {wishlistItem.sku}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${wishlistItem.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end items-center">
                        <MoveToCartBtn
                          onClick={() => {
                            dispatch(
                              addProductToCart({
                                ...wishlistItem,
                                quantity: 1,
                                subtotal: wishlistItem.price,
                              })
                            );
                            dispatch(
                              removeProductFromWishlist(wishlistItem.id)
                            );
                          }}
                        />

                        <DelWishlistBtn
                          onClick={() =>
                            dispatch(removeProductFromWishlist(wishlistItem.id))
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="text-lg font-semibold">Your Wishlist is Empty</h1>
              <p className="text-sm text-muted-foreground">
                Add items to your wishlist to see them here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="bg-accent rounded-md p-4">
          <SheetClose asChild>
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push("/user/wishlist")}
            >
              View Full Wishlist
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistBtn;
