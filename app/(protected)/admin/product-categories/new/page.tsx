"use client";
import NewProductCategoryForm from "@/components/protected/admin/create-new-category-form";
import NewProductSubCategoryForm from "@/components/protected/admin/create-new-subcategory-form";
import PageTitle from "@/components/protected/admin/page-title";

const NewProductCategoryPage = () => {
  return (
    <div>
      <PageTitle title="Add New Product Category" />
      <div className="w-full flex gap-2 my-8">
        <div className="w-full">
          <NewProductCategoryForm />
        </div>
        <div className="w-full">
          <NewProductSubCategoryForm />
        </div>
      </div>
    </div>
  );
};

export default NewProductCategoryPage;
