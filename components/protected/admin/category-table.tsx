"use client";
import {
  DELETE_PRODUCT,
  DELETE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_SUBCATEGORY,
} from "@/app/api/graphql/mutation";
import { GET_CATEGORIES } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/protected/admin/delete-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProductCategory } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CategoryTable: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [deleteProductCategory] = useMutation(DELETE_PRODUCT_CATEGORY, {
    onCompleted: () => {
      router.refresh();
    },
  });
  const [deleteProductSubcategory] = useMutation(DELETE_PRODUCT_SUBCATEGORY, {
    onCompleted: () => {
      router.refresh();
    },
  });
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      router.refresh();
    },
  });
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null
  );
  const [openSubcategoryIndex, setOpenSubcategoryIndex] = useState<
    number | null
  >(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const productCategories: IProductCategory[] = data?.productCategories || [];

  const handleProductCategoryDelete = (id: string) => {
    console.log(`Deleting category with id: ${id}`);
    deleteProductCategory({ variables: { deleteProductCategoryId: id } })
      .then(() => {
        toast.success("Category deleted successfully");
      })
      .catch((error: Error) => {
        toast.error(`Error deleting category: ${error.message}`);
      });
  };

  const handleProductSubcategoryDelete = (id: string) => {
    console.log(`Deleting subcategory with id: ${id}`);
    deleteProductSubcategory({
      variables: { handleProductSubcategoryDelete: id },
    })
      .then(() => {
        toast.success("Subcategory deleted successfully");
      })
      .catch((error: Error) => {
        toast.error(`Error deleting subcategory: ${error.message}`);
      });
  };
  const handleProductDelete = (id: string) => {
    console.log(`Deleting product with id: ${id}`);
    deleteProduct({ variables: { deleteProductId: id } })
      .then(() => {
        toast.success("Product deleted successfully");
      })
      .catch((error: Error) => {
        toast.error(`Error deleting product: ${error.message}`);
      });
  };

  const prefetchAction = () => {
    router.refresh();
  };

  const toggleSubcategoryVisibility = (index: number) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    setOpenSubcategoryIndex(null); // Reset subcategory when category changes
  };

  const toggleProductVisibility = (index: number) => {
    setOpenSubcategoryIndex(openSubcategoryIndex === index ? null : index);
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Sl.</TableHead>
          <TableHead className="font-bold">Category Name</TableHead>
          <TableHead className="font-bold">Total SubCategories</TableHead>
          <TableHead className="font-bold">Total Products</TableHead>
          <TableHead className="font-bold"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productCategories.length === 0 && (
          <p className="text-center">No categories found.</p>
        )}
        {productCategories.map((category, index) => (
          <React.Fragment key={category.id}>
            <TableRow
              className="py-2 hover:bg-accent cursor-pointer"
              onClick={() => toggleSubcategoryVisibility(index)}
            >
              <TableCell className="px-3">{index + 1}</TableCell>
              <TableCell className="px-3">{category.name}</TableCell>
              <TableCell className="px-3">
                {category.subcategories.length}
              </TableCell>
              <TableCell className="px-3">
                {category.subcategories.reduce(
                  (acc, subcategory) => acc + subcategory.products.length,
                  0
                )}
              </TableCell>
              <TableCell className="px-3">
                <DeleteDialog
                  Id={category.id}
                  item="Category"
                  onDelete={handleProductCategoryDelete}
                  prefetchAction={prefetchAction}
                />
              </TableCell>
            </TableRow>
            {openCategoryIndex === index && (
              <TableRow className="light:bg-gray-100">
                <TableCell colSpan={5} className="px-3">
                  <div className="p-2">
                    {category.subcategories.length === 0 && (
                      <p className="text-center">No subcategories found.</p>
                    )}
                    {category.subcategories.length > 0 && (
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="px-3">
                              Subcategory Name
                            </TableHead>
                            <TableHead className="px-3">
                              Total Products
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.subcategories.map(
                            (subcategory, subIndex) => (
                              <React.Fragment key={subcategory.name}>
                                <TableRow
                                  className="light:hover:bg-gray-200 cursor-pointer"
                                  onClick={() =>
                                    toggleProductVisibility(subIndex)
                                  }
                                >
                                  <TableCell className="px-3">
                                    {subcategory.name}
                                  </TableCell>
                                  <TableCell className="px-3">
                                    {subcategory.products.length}
                                  </TableCell>
                                </TableRow>
                                {openSubcategoryIndex === subIndex && (
                                  <TableRow className="light:bg-gray-200 ">
                                    <TableCell colSpan={2} className="px-3">
                                      <div className="p-2">
                                        {subcategory.products.length === 0 && (
                                          <p className="text-center">
                                            No products found.
                                          </p>
                                        )}
                                        {subcategory.products.length > 0 && (
                                          <Table className="w-full">
                                            <TableHeader>
                                              <TableRow>
                                                <TableHead className="px-3">
                                                  Product Name
                                                </TableHead>
                                                <TableHead className="px-3">
                                                  Regular Price
                                                </TableHead>
                                                <TableHead className="px-3">
                                                  Discount
                                                </TableHead>
                                                <TableHead className="px-3">
                                                  Offer Price
                                                </TableHead>
                                                <TableHead className="px-3">
                                                  Delete
                                                </TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {subcategory.products.map(
                                                (product) => (
                                                  <TableRow key={product.id}>
                                                    <TableCell className="px-3">
                                                      {product.name}
                                                    </TableCell>
                                                    <TableCell className="px-3">
                                                      {product.regularPrice}
                                                    </TableCell>
                                                    <TableCell className="px-3">
                                                      {product.discount}
                                                    </TableCell>
                                                    <TableCell className="px-3">
                                                      {product.offerPrice}
                                                    </TableCell>
                                                    <TableCell className="px-3">
                                                      <DeleteDialog
                                                        Id={product.id}
                                                        item="Product"
                                                        onDelete={
                                                          handleProductDelete
                                                        }
                                                        prefetchAction={
                                                          prefetchAction
                                                        }
                                                      />
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                              )}
                                            </TableBody>
                                          </Table>
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="px-3">
                                      <DeleteDialog
                                        Id={subcategory.id}
                                        item="Subcategory"
                                        onDelete={
                                          handleProductSubcategoryDelete
                                        }
                                        prefetchAction={prefetchAction}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )}
                              </React.Fragment>
                            )
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
