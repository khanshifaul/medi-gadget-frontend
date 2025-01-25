"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdEdit } from "react-icons/md";
interface Props {
  children?: React.ReactNode;
}

const EditDialog = ({ children }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="none">
          <MdEdit className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:min-w-[50vw] min-w-[100vw] overflow-scroll">
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
        </SheetHeader>
        <div>{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default EditDialog;
