"use client";
import { ADD_ORDER } from "@/app/api/graphql/mutation";
import { GET_USERS_ADDRESS } from "@/app/api/graphql/queries";
import UserPageBanner from "@/components/protected/user/user-page-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  selectCartItems,
  selectTotalPrice,
} from "@/lib/features/cart/cartSlice";
import { useCurrentUser } from "@/lib/hooks";
import { IUserAddress } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
const PAYMENT_METHODS = [
  {
    id: "CASH_ON_DELIVERY",
    label: "Cash on Delivery",
    image: "/Images/payment-method/cod.png",
  },
  { id: "BKASH", label: "Bkash", image: "/Images/payment-method/Bkash.png" },
  { id: "NAGAD", label: "Nagad", image: "/Images/payment-method/Nagad.png" },
  { id: "ROCKET", label: "Rocket", image: "/Images/payment-method/Rocket.png" },
  {
    id: "CREDIT_CARD",
    label: "Card",
    image: "/Images/payment-method/rok-ssl-card-icon-sslNew.png",
  },
];

const Checkout = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USERS_ADDRESS, {
    variables: { userId: user?.id },
  });
  const userAddresses: IUserAddress[] = data?.User?.userAddresses || [];
  const subtotal = parseFloat(useSelector(selectTotalPrice));
  const cartItems = useSelector(selectCartItems);

  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >(undefined);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("CASH_ON_DELIVERY");
  const [notes, setNotes] = useState<string>("");

  const selectedAddress = userAddresses.find(
    (address) => address.id === selectedAddressId
  );
  const shippingCharge = selectedAddress?.city === "Dhaka" ? 50 : 100;
  const totalPayable = subtotal + shippingCharge;

  const [addOrder, { loading: orderLoading, error: orderError }] =
    useMutation(ADD_ORDER);

  const handleSubmit = async () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }

    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      await addOrder({
        variables: {
          input: {
            userId: user?.id,
            deliveryAddress: selectedAddressId,
            paymentMethod: selectedPaymentMethod,
            items,
            discountAmount: 0,
            deliveryCharge: shippingCharge,
            notes,
          },
        },
      });

      toast.success("Order created successfully");
      router.push(`/user/orders/`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error creating order: ${error.message}`);
      } else {
        toast.error("An unknown error occurred while creating the order");
      }
    }
  };

  return (
    <section className="w-full flex flex-col pb-12">
      <UserPageBanner title="Checkout" />
      <div className="flex lg:flex-row flex-col justify-between gap-5 my-6 w-full">
        <Card className="bg-accent flex flex-col gap-3 w-full p-3 relative">
          <CardContent className="flex flex-col p-3">
            <div className="flex flex-col w-full mx-auto gap-5">
              <div className="text-3xl font-semibold self-center whitespace-nowrap border-b-2">
                Checkout Summary
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium text-nowrap">
                    Shipping Address
                  </p>
                  {loading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div>Error: {error.message}</div>
                  ) : (
                    <RadioGroup
                      value={selectedAddressId}
                      onValueChange={setSelectedAddressId}
                      className="flex flex-col gap-2"
                    >
                      {userAddresses.length > 0 &&
                        userAddresses.map((address: IUserAddress) => (
                          <div
                            key={address.id}
                            className="flex items-center space-x-2 shadow-sm border-2 dark:bg-muted p-2 rounded"
                          >
                            <RadioGroupItem
                              value={address.id}
                              id={address.id}
                            />
                            <div>
                              <Label
                                className="text-nowrap"
                                htmlFor={address.id}
                              >
                                {address.type}
                              </Label>
                              <p className="text-muted-foreground">
                                {address.address1}, {address.address2},{" "}
                                {address.city}, {address.state},{" "}
                                {address.country}
                              </p>
                            </div>
                          </div>
                        ))}
                      {userAddresses.length === 0 && (
                        <div className="flex items-center space-x-2 shadow-sm border-2 dark:bg-muted p-2 rounded">
                          <RadioGroupItem disabled value="new" id="new" />
                          <Button variant={"link"} className="p-0 h-auto">
                            Add New Address
                          </Button>
                        </div>
                      )}
                    </RadioGroup>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium text-nowrap">
                    Payment Method
                  </p>
                  <RadioGroup
                    value={selectedPaymentMethod}
                    onValueChange={setSelectedPaymentMethod}
                    className="grid grid-cols-2 gap-2"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-2 shadow-sm border-2 dark:bg-muted p-2 rounded"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex flex-col">
                          <Image
                            src={method.image}
                            alt={method.label}
                            width={100}
                            height={100}
                            className="object-contain object-left w-auto h-5"
                          />
                          <Label className="text-nowrap" htmlFor={method.id}>
                            {method.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-lg font-medium text-nowrap">
                    Notes
                  </Label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border rounded p-2 light:bg-white dark:bg-gray-900"
                    placeholder="Add any notes for your order"
                  />
                </div>
                <div className="flex items-center justify-between gap-5">
                  <Label className="text-lg font-medium text-nowrap">
                    SubTotal
                  </Label>
                  <p className="text-lg font-medium text-nowrap">
                    BDT. {subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <Label className="text-lg font-medium text-nowrap">
                    Shipping Charge
                  </Label>
                  <p className="text-lg font-medium text-nowrap">
                    BDT. {shippingCharge.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <Label className="text-lg font-bold text-nowrap">Total</Label>
                  <p className="text-primary text-lg font-medium text-nowrap">
                    BDT. {totalPayable.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                size={"lg"}
                className="bg-primary border-2 hover:border-primary text-lg py-4"
                onClick={handleSubmit}
                disabled={orderLoading}
              >
                {orderLoading ? "Processing..." : "Confirm Order"}
              </Button>
              {orderError && (
                <p className="text-red-500">Error: {orderError.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Checkout;
