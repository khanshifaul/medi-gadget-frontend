"use client";

import { UPDATE_PRODUCT } from "@/app/api/graphql/mutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct, IProductCategory, IProductSubCategory } from "@/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// GraphQL query to get categories
const GET_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      name
      subcategories {
        id
        name
      }
    }
  }
`;

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  regularPrice: z.number().positive("Regular price must be positive"),
  discount: z.number().int().min(0).max(100),
  offerPrice: z.number().min(0),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
  subcategoryId: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  details: z.string().optional(),
  detailsImages: z.array(z.string().url()).optional(),
  status: z.string(),
  tags: z.array(z.string()).optional(),
  flexibleData: z.string().optional(),
});

interface EditProductFormProps {
  product: IProduct;
}

const EditProductForm = ({ product }: EditProductFormProps) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [updateProduct, { loading: updateLoading }] = useMutation(
    UPDATE_PRODUCT,
    {
      onCompleted: () => {
        toast.success("Product updated successfully!");
      },
      onError: (error) => {
        console.error(`Error updating product: ${error.message}`);
        toast.error("An error occurred while updating the product.");
      },
    }
  );

  const [formState, setFormState] = useState<z.infer<typeof productSchema>>({
    name: "",
    sku: "",
    regularPrice: 0,
    discount: 0,
    offerPrice: 0,
    stock: 0,
    categoryId: "",
    subcategoryId: "",
    images: [],
    details: "",
    detailsImages: [],
    status: "ACTIVE",
    tags: [],
    flexibleData: "{}",
  });

  useEffect(() => {
    if (product) {
      setFormState({
        name: product.name || "",
        sku: product.sku || "",
        images: product.images || [],
        detailsImages: product.detailsImages || [],
        regularPrice: product.regularPrice || 0,
        discount: product.discount || 0,
        offerPrice: product.offerPrice || 0,
        stock: product.stock || 0,
        status: product.status || "ACTIVE",
        tags: product.tags || [],
        details: product.details || "",
        flexibleData: product.flexibleData || "{}",
        categoryId: product.category?.id,
        subcategoryId: product.subcategory?.id,
      });
    }
  }, [product]);

  useEffect(() => {
    if (data && product) {
      setFormState((prevState) => ({
        ...prevState,
        categoryId: product.category?.id || "",
        subcategoryId: product.subcategory?.id || "",
      }));
    }
  }, [data, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      let formattedValue: string | number | string[];

      if (name === "regularPrice" || name === "offerPrice") {
        formattedValue = parseFloat(value);
      } else if (name === "discount" || name === "stock") {
        formattedValue = parseInt(value, 10);
      } else if (name === "tags") {
        formattedValue = value.split(",").map((tag) => tag.trim());
      } else {
        formattedValue = value;
      }

      return {
        ...prevState,
        [name]: formattedValue,
      };
    });
  };

  const handleFlexibleDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      flexibleData: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addImageField = () => {
    setFormState((prevState) => ({
      ...prevState,
      images: [...(prevState.images || []), ""],
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...(formState.images || [])];
    updatedImages[index] = value;
    setFormState((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const removeImageField = (index: number) => {
    const updatedImages = formState.images?.filter((_, i) => i !== index);
    setFormState((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = productSchema.safeParse(formState);
    if (!validation.success) {
      console.error(validation.error.format());
      toast.error("Please correct the errors in the form.");
      return;
    }

    if (!formState.categoryId || !formState.subcategoryId) {
      toast.error("Category and Subcategory must be selected.");
      return;
    }

    try {
      await updateProduct({
        variables: {
          updateProductId: product.id,
          input: {
            ...formState,
            categoryId: formState.categoryId,
            subcategoryId: formState.subcategoryId,
          },
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  useEffect(() => {
    const calculatedOfferPrice =
      formState.regularPrice -
      (formState.regularPrice * formState.discount) / 100;
    setFormState((prevState) => ({
      ...prevState,
      offerPrice: calculatedOfferPrice,
    }));
  }, [formState.regularPrice, formState.discount]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          name="sku"
          value={formState.sku}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="regularPrice">Regular Price</Label>
        <Input
          type="number"
          id="regularPrice"
          name="regularPrice"
          value={formState.regularPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="discount">Discount (%)</Label>
        <Input
          type="number"
          id="discount"
          name="discount"
          value={formState.discount}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="offerPrice">Offer Price</Label>
        <Input
          type="number"
          id="offerPrice"
          name="offerPrice"
          value={formState.offerPrice}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          value={formState.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Label
            htmlFor="categoryId"
            className="block text-base font-semibold mb-1"
          >
            Category
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange("categoryId", value)}
            value={formState.categoryId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {data?.productCategories?.map((category: IProductCategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label
            htmlFor="subcategoryId"
            className="block text-base font-semibold mb-1"
          >
            Subcategory
          </Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("subcategoryId", value)
            }
            value={formState.subcategoryId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subcategories</SelectLabel>
                {data?.productCategories
                  ?.find(
                    (category: IProductCategory) =>
                      category.id === formState.categoryId
                  )
                  ?.subcategories.map((subcategory: IProductSubCategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {formState.images && (
        <div>
          <div className="flex justify-between">
            <Label htmlFor="images">Images</Label>
            <Button variant={"none"} onClick={addImageField}>
              <Plus />
            </Button>
          </div>
          <ul className="flex flex-col gap-2">
            {formState.images.map((image, index) => (
              <li key={index} className="flex gap-2">
                <Input
                  type="text"
                  id={`image-${index}`}
                  name={`images[${index}]`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
                <Button
                  variant={"none"}
                  onClick={() => removeImageField(index)}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Label htmlFor="details">Details</Label>
        <Input
          id="details"
          name="details"
          value={formState.details}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => handleSelectChange("status", value)}
          value={formState.status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="DISCONTINUED">DISCONTINUED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={formState.tags?.join(",") || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="flexibleData">Flexible Data</Label>
        <textarea
          id="flexibleData"
          name="flexibleData"
          value={formState.flexibleData}
          onChange={handleFlexibleDataChange}
          placeholder='Flexible Data (e.g., {"key": "value"})'
          style={{ height: "150px", width: "100%" }}
          className="border dark:bg-slate-700 border-gray-300 rounded-md p-2"
        />
      </div>
      <Button type="submit" disabled={updateLoading}>
        {updateLoading ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
};

export default EditProductForm;
