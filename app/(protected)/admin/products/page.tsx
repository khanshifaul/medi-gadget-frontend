"use client";
import PageTitle from "@/components/protected/admin/page-title";
import ProductTable from "@/components/protected/admin/product-table";
import RefreshBtn from "@/components/protected/admin/refresh-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Products = () => {
  return (
    <div>
      <PageTitle title="Products">
        <div className="flex gap-2">
          <RefreshBtn />
          <Button size={"sm"}>
            <Link href={"/admin/products/new"}>Add New Product</Link>
          </Button>
        </div>
      </PageTitle>

      <ProductTable />
    </div>
  );
};

export default Products;
