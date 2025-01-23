"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface MoveToCartBtnProps {
  onClick: () => void;
}

const MoveToCartBtn: React.FC<MoveToCartBtnProps> = ({ onClick }) => {
  return (
    <Button
      variant="default"
      size="sm"
      className="flex items-center gap-1"
      onClick={onClick}
    >
      <ShoppingCart className="w-4 h-4" />
      Move to Cart
    </Button>
  );
};

export default MoveToCartBtn;
