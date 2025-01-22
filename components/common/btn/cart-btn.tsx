"use client";
import { Button } from "@/components/ui/button";

import DelCartBtn from "@/components/common/btn/del-cart-btn";
import Counter from "@/components/common/cart-counter";
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
import {
  CartItem,
  openCart,
  removeProductFromCart,
  selectCartIsOpen,
  selectCartItems,
  selectTotalCartItems,
  selectTotalPrice,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartBtn = () => {
  const dispatch = useAppDispatch();
  const cartIsOpen = useAppSelector(selectCartIsOpen);
  const cartItems = useAppSelector(selectCartItems);
  const totalCartItems = useAppSelector(selectTotalCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 relative"
          onClick={() => {
            dispatch(openCart());
          }}
        >
          <MdOutlineShoppingCart className="text-2xl" />
          {totalCartItems !== 0 && (
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-destructive rounded-full aspect-square text-sm">
              {totalCartItems < 9 ? totalCartItems : "9+"}
            </div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        className={`flex flex-col gap-2 min-h-screen md:min-w-[50vw] min-w-[100vw] fixed top-0 right-0 z-50 transition-all bg-background text-foreground p-2 rounded-r-none ${
          cartIsOpen ? "animate-right-left" : "translate-x-full"
        }`}
      >
        <SheetHeader className="w-full flex flex-row items-center justify-between bg-accent rounded-md p-3">
          <SheetTitle className="flex">
            <MdOutlineShoppingCart className="text-2xl" />
            Cart [{totalCartItems}]
          </SheetTitle>
        </SheetHeader>

        <div className="bg-accent rounded-md p-2 overflow-auto">
          {totalCartItems > 0 && (
            <Table className="w-full">
              <TableHeader className="bg-secondary/100 rounded-lg">
                <TableRow className="rounded-lg">
                  <TableHead className="text-default font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-default font-semibold">
                    Price
                  </TableHead>
                  <TableHead className="text-default font-semibold">
                    Quantity
                  </TableHead>
                  <TableHead className="text-default font-semibold">
                    SubTotal
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((cartItem: CartItem) => {
                  return (
                    <TableRow key={cartItem.id} className="hover:bg-muted/60">
                      <TableCell>
                        <Image
                          src={cartItem.image}
                          alt={cartItem.name}
                          width={100}
                          height={100}
                        />
                        <div>{cartItem.name}</div>
                        <div>{cartItem.sku}</div>
                      </TableCell>
                      <TableCell>{cartItem.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Counter
                          id={cartItem.id}
                          quantity={cartItem.quantity}
                        />
                      </TableCell>
                      <TableCell>{cartItem.subtotal.toFixed(2)}</TableCell>
                      <TableCell>
                        <DelCartBtn
                          onClick={() => {
                            dispatch(removeProductFromCart(cartItem.id));
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {totalCartItems === 0 && (
            <div>
              <h1>No Items Added to Cart</h1>
            </div>
          )}
        </div>
        <div className="flex justify-between bg-accent rounded-md p-2">
          <span>Total:</span> <span>BDT. {totalPrice}</span>
        </div>

        <SheetFooter className="w-full bg-accent rounded-md p-2">
          <SheetClose asChild>
            <Button
              size={"lg"}
              className="w-full"
              onClick={() => {
                router.push("/user/cart");
              }}
            >
              View Cart
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartBtn;
