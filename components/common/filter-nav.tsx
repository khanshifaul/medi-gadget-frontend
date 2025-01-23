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
import { useState } from "react";
import { MdOutlineGridView, MdOutlineViewDay } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const FilterNav = () => {
  const dispatch = useAppDispatch();
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState("1 - 25");
  const [sortBy, setSortBy] = useState("Default");

  const handleFilterToggle = () => {
    dispatch(toggleFilter());
  };

  const handleViewTypeChange = (type: "grid" | "list") => {
    setViewType(type);
  };

  return (
    <div className="bg-accent text-accent-foreground w-full flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-4">
      {/* Left Section: Filter and View Type */}
      <div className="w-full flex items-start justify-between gap-3">
        {/* Filter Toggle Button */}
        <Button
          variant="outline"
          className="p-2"
          onClick={handleFilterToggle}
          aria-label="Toggle Filters"
        >
          <TbAdjustmentsHorizontal className="text-2xl" />
        </Button>

        {/* View Type Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewType === "grid" ? "solid" : "outline"}
            className="p-2"
            onClick={() => handleViewTypeChange("grid")}
            aria-label="Grid View"
          >
            <MdOutlineGridView className="text-2xl" />
          </Button>
          <Button
            variant={viewType === "list" ? "solid" : "outline"}
            className="p-2"
            onClick={() => handleViewTypeChange("list")}
            aria-label="List View"
          >
            <MdOutlineViewDay className="text-2xl" />
          </Button>
        </div>
      </div>

      {/* Right Section: Items Per Page and Sort By */}
      <div className="flex items-center gap-5">
        {/* Items Per Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-md my-auto text-nowrap">Show</span>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => setItemsPerPage(value)}
          >
            <SelectTrigger className="border-accent-foreground">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items Per Page</SelectLabel>
                <SelectItem value="1 - 25">1 - 25</SelectItem>
                <SelectItem value="26 - 50">26 - 50</SelectItem>
                <SelectItem value="51 - 75">51 - 75</SelectItem>
                <SelectItem value="76 - 100">76 - 100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By Selector */}
        <div className="flex items-center gap-2">
          <span className="text-md my-auto text-nowrap">Sort by</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="border-accent-foreground">
              <SelectValue placeholder={sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Price(Low > High)">
                  Price (Low &gt; High)
                </SelectItem>
                <SelectItem value="Price(High > Low)">
                  Price (High &gt; Low)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterNav;
