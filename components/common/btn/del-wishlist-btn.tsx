"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DelWishlistBtnProps {
  onClick: () => void;
}

const DelWishlistBtn: React.FC<DelWishlistBtnProps> = ({ onClick }) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      className="flex items-center gap-1"
      onClick={onClick}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DelWishlistBtn;
