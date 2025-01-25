"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  ChevronLeft,
  Edit,
  Filter,
  Heart,
  Minus,
  Plus,
  Search,
  Share,
  ShoppingCart,
  Sun,
  Trash,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SquareButtonProps {
  icon:
    | "cart"
    | "compare"
    | "wishlist"
    | "back"
    | "close"
    | "plus"
    | "minus"
    | "search"
    | "arrow"
    | "edit"
    | "delete"
    | "filter"
    | "share"
    | "user"
    | "theme"
    | "notification";
  className?: string;
  onClick?: () => void;
}

const iconMap = {
  cart: ShoppingCart,
  compare: ArrowLeftRight,
  wishlist: Heart,
  back: ChevronLeft,
  close: X,
  plus: Plus,
  minus: Minus,
  search: Search,
  arrow: ArrowRight,
  edit: Edit,
  delete: Trash,
  filter: Filter,
  share: Share,
  user: User,
  theme: Sun,
  notification: Bell,
};

const SquareButton = ({ icon, className, onClick }: SquareButtonProps) => {
  const router = useRouter();
  const IconComponent = iconMap[icon];

  const handleClick = () => {
    switch (icon) {
      case "cart":
        toast("Confirm your order", {
          description: "Item has been added to cart",
          action: {
            label: "Buy Now",
            onClick: () => {
              router.push("/user/cart");
            },
          },
        });
        break;
      case "compare":
        toast("Item has been added to Comparison List");
        break;
      case "wishlist":
        toast("Item has been added to Wish List");
        break;
      case "back":
        router.back();
        break;
      default:
        break;
    }
    onClick?.();
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`${className} p-0 w-6 h-6 md:w-8 md:h-8 aspect-square`}
    >
      <IconComponent className="text-2xl" />
    </Button>
  );
};

export default SquareButton;
