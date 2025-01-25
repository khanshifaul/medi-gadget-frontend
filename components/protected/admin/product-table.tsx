"use client";
import { DELETE_PRODUCT } from "@/app/api/graphql/mutation";
import { GET_PRODUCTS } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/protected/admin/delete-dialog";
import EditDialog from "@/components/protected/admin/edit-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditProductForm from "./edit-product-form";

const ProductTable = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      router.refresh();
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products: IProduct[] = data?.Products || [];

  const handleDelete = (id: string) => {
    console.log(`Deleting product with id: ${id}`);
    deleteProduct({ variables: { deleteProductId: id } })
      .then(() => {
        toast.success("Product deleted successfully");
      })
      .catch((error) => {
        toast.error("Error deleting product:", error);
        console.error(error);
      });
  };

  const prefetchAction = () => {
    router.refresh();
  };

  return (
    <div className="flex justify-start items-center my-4">
      <Table className="">
        <TableHeader className="w-full bg-accent">
          <TableRow className="py-2">
            <TableHead className="px-3 text-nowrap">Index</TableHead>
            <TableHead className="px-3 text-nowrap">Images</TableHead>
            <TableHead className="px-3 text-nowrap">Name</TableHead>
            <TableHead className="px-3 text-nowrap">Code</TableHead>
            <TableHead className="px-3 text-nowrap">Category</TableHead>
            <TableHead className="px-3 text-nowrap">Regular Price</TableHead>
            <TableHead className="px-3 text-nowrap">Discount (%)</TableHead>
            <TableHead className="px-3 text-nowrap">Offer Price</TableHead>
            <TableHead className="px-3 text-nowrap">Created At</TableHead>
            <TableHead className="px-3 text-nowrap">Updated At</TableHead>
            <TableHead className="px-3 text-nowrap">Edit</TableHead>
            <TableHead className="px-3 text-nowrap">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center">
                No Products
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow
                key={product.id}
                className="py-2 hover:bg-blue-100 hover:text-muted odd:bg-background even:bg-accent"
              >
                <TableCell className="px-3">{index + 1}</TableCell>
                <TableCell className="px-3">
                  <div className="grid grid-cols-3 gap-1">
                    {product.images.map((image, idx) => (
                      <Image
                        key={idx}
                        src={image}
                        alt=""
                        width={100}
                        height={100}
                        className="aspect-square object-cover"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-3">
                  <Link
                    href={`/admin/products/${product.categoryId}/${product.id}`}
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="px-3">{product.sku}</TableCell>
                <TableCell className="px-3">{product.categoryId}</TableCell>
                <TableCell className="px-3">
                  {product.regularPrice?.toString()}
                </TableCell>
                <TableCell className="px-3">
                  {product.discount?.toString()}
                </TableCell>
                <TableCell className="px-3">
                  {product.offerPrice?.toString()}
                </TableCell>
                <TableCell className="px-3">
                  {new Date(product.createdAt).toUTCString()}
                </TableCell>
                <TableCell className="px-3">
                  {new Date(product.updatedAt).toUTCString()}
                </TableCell>
                <TableCell className="px-3">
                  <EditDialog>
                    <EditProductForm product={product} />
                  </EditDialog>
                </TableCell>
                <TableCell className="px-3">
                  <DeleteDialog
                    Id={product.id}
                    item="product"
                    onDelete={handleDelete}
                    prefetchAction={prefetchAction}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
