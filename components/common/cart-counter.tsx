"use client";
import { Button } from "@/components/ui/button";
import {
  decrementProductQuantity,
  incrementProductQuantity,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CounterProps {
  id: string;
  quantity: number;
}

const Counter = ({ id, quantity }: CounterProps) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(incrementProductQuantity(id)); // Pass only the id
  };

  const handleDecrement = () => {
    dispatch(decrementProductQuantity(id)); // Pass only the id
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"outline"}
        onClick={handleDecrement}
        className="p-0 h-8 w-8"
      >
        <FaMinus />
      </Button>
      <div className="flex justify-center items-center px-2 border-2 h-8 w-8">
        <h3>{quantity}</h3>
      </div>
      <Button
        variant={"outline"}
        onClick={handleIncrement}
        className="p-0 h-8 w-8"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default Counter;
