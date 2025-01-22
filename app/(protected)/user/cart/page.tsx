// app/protected/user/cart/page.tsx

import CartCard from "@/components/protected/user/cart-card";
import UserPageBanner from "@/components/protected/user/user-page-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart = () => {
  return (
    <>
      <section className="w-full flex flex-col pb-12">
        <UserPageBanner title="Cart" />

        <div className="flex lg:flex-row flex-col justify-between gap-5 my-6 w-full">
          <CartCard />
        </div>
      </section>
    </>
  );
};

export default Cart;
