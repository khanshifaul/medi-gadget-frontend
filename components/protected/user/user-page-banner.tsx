import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
interface PageTitle {
  title: string;
}
export const navData = [
  { name: "Profile", path: "/user" },
  { name: "Security", path: "/user/security" },
  { name: "My order", path: "/user/my-order" },
  { name: "My Review and Rating", path: "/user/my-review-and-rating" },
  { name: "My Wishlist", path: "/user/my-wishlist" },
];

const UserPageBanner = ({ title }: PageTitle) => {
  return (
    <Card className="w-full bg-accent flex">
      <CardContent className="flex items-center justify-start gap-2 p-6">
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="none" className="px-0 text-foreground">
                <SlOptionsVertical className="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col w-full">
              {navData.map((link, index) => {
                return (
                  <Button key={index} variant={"ghost"}>
                    <Link href={link.path}>{link.name}</Link>
                  </Button>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/">Home</Link>
        <MdArrowForward className="text-xl" />
        <div className="self-center grow whitespace-nowrap my-auto">
          {title}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPageBanner;
