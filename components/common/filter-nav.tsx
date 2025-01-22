"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toggleFilter } from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch } from "@/lib/hooks";
import { MdOutlineGridView, MdOutlineViewDay } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
const FilterNav = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleFilter());
  };
  return (
    <div className="bg-accent text-accent-foreground w-full flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-4">
      <div className="w-full flex items-start justify-between gap-3">
        <div className="flex justify-between items-center">
          <Button variant="none" className="p-0 m-0" onClick={handleClick}>
            <TbAdjustmentsHorizontal className="text-2xl" />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="none" className="p-0 m-0">
            <MdOutlineGridView className="text-2xl" />
          </Button>
          <Button variant="none" className="p-0 m-0">
            <MdOutlineViewDay className="text-2xl" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <div className=" text-md my-auto text-nowrap">Show</div>
          <div className="text-neutral-400 text-md whitespace-nowrap flex text-center items-center">
            <Select>
              <SelectTrigger className="border-accent-foreground">
                <SelectValue placeholder="1 - 25" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Show</SelectLabel>
                  <SelectItem value="apple">1 - 25</SelectItem>
                  <SelectItem value="banana">26 - 50</SelectItem>
                  <SelectItem value="blueberry">51 - 75</SelectItem>
                  <SelectItem value="grapes">76 - 100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className=" text-md my-auto text-nowrap">Short by</div>
          <div className="text-neutral-400 text-md whitespace-nowrap flex text-center items-center">
            <Select>
              <SelectTrigger className="border-accent-foreground">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="apple">Price(Low &gt; High)</SelectItem>
                  <SelectItem value="banana">Price(High &gt; Low)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterNav;
