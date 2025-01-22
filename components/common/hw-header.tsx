"use client";
import CartBtn from "@/components/common/btn/cart-btn";
import CompareBtn from "@/components/common/btn/compare-btn";
import FavBtn from "@/components/common/btn/fav-btn";
import MenuClose from "@/components/common/btn/menu-close";
import MenuOpen from "@/components/common/btn/menu-open";
import { ThemeBtn } from "@/components/common/btn/theme-btn";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  closeNav,
  selectNavIsOpen,
} from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector, useCurrentUser } from "@/lib/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoginButton } from "../auth/login-button";
import { UserButton } from "../auth/user-button";

export const navData = [
  { name: "Home", icon: "<FcHome />", path: "/" },
  { name: "Shop", icon: "<FcShop />", path: "/shop" },
  { name: "Ambulance", icon: "<FcShop />", path: "/ambulance" },
  { name: "Contact", icon: "<FcSms />", path: "/contact" },
  { name: "Blog", icon: "<FcReading />", path: "/blog" },
];

const GuestHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const navIsOpen = useAppSelector(selectNavIsOpen);
  return (
    <div className="sticky top-0 z-50 bg-background">
      <div className="md:container mx-auto p-2">
        <div className="flex justify-between items-center min-md:mx-12">
          <Logo />
          <nav
            className={`hidden md:flex flex-row justify-end items-center gap-4 px-12`}
          >
            {navData.map((link, index) => {
              return (
                <Button
                  variant={"link"}
                  onClick={() => {
                    router.push(link.path);
                  }}
                  key={index}
                  className={`${
                    link.path === pathname
                      ? "border-b-2 shadow-sm"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Button>
              );
            })}
          </nav>

          <div className="flex justify-end items-center gap-2">
            {!user && (
              <div className="flex items-center gap-2">
                <LoginButton asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={`hidden md:block w-fit rounded-none rounded-bl-lg`}
                  >
                    <Link href={"/login"}>Sign In</Link>
                  </Button>
                </LoginButton>
                <CartBtn />
                <CompareBtn />
                <FavBtn />
                <ThemeBtn />
              </div>
            )}

            {user && (
              <div className="flex justify-between gap-2 md:gap-5 my-auto max-md:justify-center items-center">
                <UserButton />
                <CartBtn />
                <CompareBtn />
                <FavBtn />
                <ThemeBtn />
              </div>
            )}
            <div className="block md:hidden">
              {!navIsOpen ? <MenuOpen /> : <MenuClose />}
            </div>
          </div>
        </div>

        <div
          className={`min-h-screen w-[100vw] fixed left-0 transition-all bg-background text-foreground p-4 ${
            navIsOpen ? "animate-left-right" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col justify-end items-end gap-4">
            {navData.map((link, index) => {
              return (
                <Button
                  variant={"link"}
                  onClick={() => {
                    router.push(link.path);
                    dispatch(closeNav());
                  }}
                  key={index}
                  className={`text-xl ${
                    link.path === pathname
                      ? "text-primary border-b-2 shadow-sm"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Button>
              );
            })}
            {!user && (
              <div className="md:hidden flex flex-col items-center gap-2">
                <LoginButton asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={`w-fit rounded-none rounded-bl-lg text-lg`}
                  >
                    <Link href={"/login"}>Sign In</Link>
                  </Button>
                </LoginButton>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default GuestHeader;
