// @/pages/admin/categories.js
import CategoryTable from "@/components/protected/admin/category-table";
import PageTitle from "@/components/protected/admin/page-title";
import RefreshBtn from "@/components/protected/admin/refresh-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoriesPage = async () => {
  return (
    <div>
      <PageTitle title="Categories">
        <div className="flex gap-2">
          <RefreshBtn />
          <Button size={"sm"}>
            <Link href={"/admin/product-categories/new"}>
              Create New Category
            </Link>
          </Button>
        </div>
      </PageTitle>
      <div className="flex justify-start items-center my-4">
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoriesPage;
