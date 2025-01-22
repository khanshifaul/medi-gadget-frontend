import NewProductForm from "@/components/protected/admin/create-new-product-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Product",
};
const NewProduct = () => {
  return (
    <div>
      <NewProductForm />
    </div>
  );
};

export default NewProduct;
