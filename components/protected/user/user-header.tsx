"use client";
import { UserBox } from "@/components/auth/userbox";
import { SidebarToggler } from "@/components/common/btn/sidebar-toggler";
import { ThemeBtn } from "@/components/common/btn/theme-btn";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
export const navData = [
  { name: "Home", icon: "<FcHome />", path: "/" },
  { name: "Shop", icon: "<FcShop />", path: "/shop" },
  { name: "Ambulance", icon: "<FcShop />", path: "/ambulance" },
  { name: "Contact", icon: "<FcSms />", path: "/contact" },
  { name: "Blog", icon: "<FcReading />", path: "/blog" },
];
const UserHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="sticky w-full top-0 z-50 bg-background p-2">
      <div className="md:container mx-auto">
        <div className="flex justify-between items-center min-md:mx-12">
          <div className="flex justify-between items-center">
            <div className="md:hidden block">
              <SidebarToggler />
            </div>
            <nav
              className={`hidden lg:flex flex-row justify-end items-center gap-4 px-12`}
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
          </div>
          <div className="flex items-center gap-3">
            <UserBox />
            <ThemeBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
