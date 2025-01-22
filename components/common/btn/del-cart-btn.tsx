"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
interface AddCartBtnProps {
  className?: string;
  onClick?: () => void;
}

const DelCartBtn = ({ className, onClick }: AddCartBtnProps) => {
  const handleClick = () => {
    toast("Item has been deleted from cart");
    onClick?.();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="none" className={`${className} p-0`}>
          <MdDelete className="text-2xl" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DelCartBtn;
