// components/menu-open.tsx
"use client";
import { Button } from "@/components/ui/button";
import { openNav } from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch } from "@/lib/hooks";
import { MdMenu } from "react-icons/md";

const MenuOpen = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openNav());
  };
  return (
    <Button variant={"none"} size={"icon"} onClick={handleClick}>
      <MdMenu className="text-2xl text-foreground" />
    </Button>
  );
};

export default MenuOpen;
