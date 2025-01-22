import type { Metadata } from "next";
import CreateNewProductForm from "./create-new-product-form";

export const metadata: Metadata = {
  title: "Create New Product",
};
const EditForm = () => {
  return (
    <div>
      <CreateNewProductForm />
    </div>
  );
};

export default EditForm;
