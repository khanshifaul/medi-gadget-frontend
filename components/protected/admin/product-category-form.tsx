"use server";

import { SelectItem } from "@/components/ui/select";
import { db } from "@/lib/db";
const SelectProductCategory = async () => {
  const productCategory = await db.productCategory.findMany();
  return (
    <>
      {productCategory.map((category, index) => (
        <SelectItem key={index} value={category.name}>
          {category.name}
        </SelectItem>
      ))}
    </>
  );
};

export default SelectProductCategory;
