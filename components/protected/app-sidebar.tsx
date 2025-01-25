import {
  FileText,
  Home,
  List,
  MessageSquare,
  Package,
  PackageCheck,
  Settings,
  Store,
  User,
  Users,
} from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

interface AppSidebarProps {
  role: "admin" | "user";
}

export const adminNavData = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "My Store", path: "/admin/my-store", icon: Store },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  { name: "Users", path: "/admin/users", icon: User },
  { name: "Categories", path: "/admin/product-categories", icon: List },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: PackageCheck },
  { name: "Blog Posts", path: "/admin/blog-posts", icon: FileText },
  { name: "Subscribers", path: "/admin/subscribers", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export const userNavData = [
  { name: "My Account", path: "/user", icon: User },
  { name: "Change Password", path: "/user/password-change", icon: User },
  { name: "My Cart", path: "/user/cart", icon: Package },
  { name: "My Order", path: "/user/my-orders", icon: Package },
  { name: "My Wishlist", path: "/user/my-wishlists", icon: Package },
];
export const AppSidebar: React.FC<AppSidebarProps> = ({ role }) => {
  const router = useRouter();
  const navData = role === "admin" ? adminNavData : userNavData;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2">
          {navData.map((link, index) => {
            const Icon = link.icon;
            return (
              <Button
                variant={"outline"}
                onClick={() => {
                  router.push(link.path);
                }}
                key={index}
                className="w-full text-left flex justify-start items-center gap-2"
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Button>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-center">
          <span> {new Date().getFullYear()} &copy; </span>
          MediGadget.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};
