"use client";
import DelCartBtn from "@/components/common/btn/del-cart-btn";
import Counter from "@/components/common/cart-counter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  removeProductFromCart,
  selectCartItems,
  selectTotalCartItems,
  selectTotalPrice,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define a type for cart items
interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}
// Adjust the component to handle the absence of productCode
const CartCard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalCartItems = useAppSelector(selectTotalCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <Card className="flex flex-col gap-3 w-full p-3 relative">
      <CardHeader className="flex flex-col rounded-lg p-0">
        <CardTitle className="bg-accent rounded-md p-2 text-2xl">
          Cart [{totalCartItems}]
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col rounded-lg p-0">
        <div className="bg-accent rounded-md p-2">
          {totalCartItems > 0 && (
            <Table className="w-full border-white">
              <TableHeader className="rounded-lg">
                <TableRow className="rounded-lg bg-muted/60">
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
                {cartItems.map((cartItem: CartItem, index: number) => (
                  <TableRow
                    key={index}
                    className="rounded-lg hover:bg-muted/60"
                  >
                    <TableCell>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        width={100}
                        height={100}
                      />
                      <div>{cartItem.name}</div>
                      {/* Handle missing productCode */}
                    </TableCell>
                    <TableCell>{cartItem.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Counter id={cartItem.id} quantity={cartItem.quantity} />
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
                ))}
              </TableBody>
            </Table>
          )}
          {totalCartItems === 0 && (
            <div>
              <h1>No Items Added to Cart</h1>
            </div>
          )}
        </div>
      </CardContent>
      <CardContent className="flex flex-col rounded-lg p-0">
        <div className="flex justify-between bg-accent rounded-md p-2">
          <span>Total:</span> <span>BDT. {totalPrice}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col rounded-lg p-3">
        <div className="w-full flex justify-end rounded-md">
          <Button
            size={"lg"}
            onClick={() => {
              router.push("/user/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartCard;
