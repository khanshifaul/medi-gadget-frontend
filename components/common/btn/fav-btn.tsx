import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdFavoriteBorder } from "react-icons/md";

const FavBtn = () => {
  return (
    <Button variant="outline" size="icon" className="h-8">
      <Link href="/wishlist">
        <MdFavoriteBorder className="text-2xl" />
      </Link>
    </Button>
  );
};

export default FavBtn;
