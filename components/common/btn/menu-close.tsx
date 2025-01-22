// components/menu-close.tsx

"use client";
import { Button } from "@/components/ui/button";
import { closeNav } from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch } from "@/lib/hooks";
import { MdClose } from "react-icons/md";
const MenuClose = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(closeNav());
  };
  return (
    <Button variant={"none"} size={"icon"} onClick={handleClick}>
      <MdClose className="text-2xl text-foreground" />
    </Button>
  );
};

export default MenuClose;
