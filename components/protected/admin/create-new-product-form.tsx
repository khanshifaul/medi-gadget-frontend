"use client";

import { ADD_PRODUCT } from "@/app/api/graphql/mutation";
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
import { IProductCategory, IProductSubCategory } from "@/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  regularPrice: z.number().positive("Regular price must be positive"),
  discount: z
    .number()
    .int()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100%"),
  offerPrice: z.number().min(0, "Offer price cannot be negative"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  categoryId: z.string().min(1, "Category ID is required"),
  subcategoryId: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  detailsImages: z.array(z.string().url()).optional(),
  status: z.string(),
  tags: z.array(z.string()).optional(),
  details: z.string().optional(),
  flexibleData: z.string(z.object({}).passthrough()).optional(),
});

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

const NewProductForm = () => {
  const router = useRouter();
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);
  const [formState, setFormState] = useState<z.infer<typeof productSchema>>({
    name: "",
    sku: "",
    regularPrice: 0.0,
    discount: 0,
    offerPrice: 0.0,
    stock: 0,
    categoryId: "",
    subcategoryId: "",
    images: [""], // Ensure one image input is visible by default
    detailsImages: [],
    status: "ACTIVE",
    tags: [],
    details: "",
    flexibleData: "", // Initialize with valid JSON
  });

  const [addProduct, { loading: addProductLoading, error: addProductError }] =
    useMutation(ADD_PRODUCT, {
      onCompleted: () => {
        toast.success("Product added successfully!");
        setFormState({
          name: "",
          sku: "",
          regularPrice: 0.0,
          discount: 0,
          offerPrice: 0.0,
          stock: 0,
          categoryId: "",
          subcategoryId: "",
          images: [""],
          detailsImages: [],
          status: "ACTIVE",
          tags: [],
          details: "",
          flexibleData: "{}",
        });
        router.push("/admin/products");
      },
      onError: (error) => {
        toast.error(`Error adding product: ${error.message}`);
      },
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      let formattedValue: string | number | string[];

      if (name === "regularPrice" || name === "offerPrice") {
        formattedValue = parseFloat(value); // Ensure it's a number
      } else if (name === "discount" || name === "stock") {
        formattedValue = parseInt(value, 10); // Ensure it's an integer
      } else if (name === "tags") {
        formattedValue = value.split(",").map((tag) => tag.trim());
      } else {
        formattedValue = value; // Default to string for other fields
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = productSchema.safeParse(formState);
    if (!validation.success) {
      console.error(validation.error.format());
      toast.error("Please correct the errors in the form.");
      return;
    }
    addProduct({ variables: { ...formState } });
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

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError)
    return <div>Error loading categories: {categoriesError.message}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-auto">
      <div>
        <Label htmlFor="name" className="block text-base font-semibold mb-1">
          Product Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Product Name"
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
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {data.productCategories.map((category: IProductCategory) => (
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
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subcategories</SelectLabel>
                {data.productCategories
                  .find(
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
      <div className="flex gap-4 w-full">
        <div className="w-full">
          <Label htmlFor="sku" className="block text-base font-semibold mb-1">
            SKU
          </Label>
          <Input
            id="sku"
            name="sku"
            value={formState.sku}
            onChange={handleChange}
            placeholder="SKU"
            required
          />
        </div>
        <div className="w-full">
          <Label htmlFor="stock" className="block text-base font-semibold mb-1">
            Stock
          </Label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={formState.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="w-full">
          <Label
            htmlFor="regularPrice"
            className="block text-base font-semibold mb-1"
          >
            Regular Price
          </Label>
          <Input
            type="number"
            step="0.01"
            id="regularPrice"
            name="regularPrice"
            value={formState.regularPrice}
            onChange={handleChange}
            placeholder="Regular Price"
            required
          />
        </div>
        <div className="w-full">
          <Label
            htmlFor="discount"
            className="block text-base font-semibold mb-1"
          >
            Discount (%)
          </Label>
          <Input
            type="number"
            id="discount"
            name="discount"
            value={formState.discount}
            onChange={handleChange}
            placeholder="Discount"
          />
        </div>
        <div className="w-full">
          <Label
            htmlFor="offerPrice"
            className="block text-base font-semibold mb-1"
          >
            Offer Price
          </Label>
          <Input
            type="number"
            step="0.01"
            id="offerPrice"
            name="offerPrice"
            value={formState.offerPrice}
            onChange={handleChange}
            placeholder="Offer Price"
            readOnly
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags" className="block text-base font-semibold mb-1">
          Tags (comma separated)
        </Label>
        <Input
          id="tags"
          name="tags"
          value={formState.tags?.join(",") || ""}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
        />
      </div>
      <div>
        <Label htmlFor="details" className="block text-base font-semibold mb-1">
          Details
        </Label>
        <Input
          id="details"
          name="details"
          value={formState.details}
          onChange={handleChange}
          placeholder="Details"
        />
      </div>
      {/* Images Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="block text-base font-semibold mb-1">
            Product Images
          </Label>
          <Button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {formState.images?.map((image, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Input
              type="text"
              value={image}
              placeholder="Image URL"
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => removeImageField(index)}
              className="text-red-500"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <Label
          htmlFor="flexibleData"
          className="block text-base font-semibold mb-1"
        >
          Flexible Data
        </Label>
        <textarea
          id="flexibleData"
          name="flexibleData"
          value={formState.flexibleData}
          onChange={handleFlexibleDataChange}
          placeholder='Flexible Data (e.g., {"key": "value"})'
          style={{ height: "150px", width: "100%" }} // Set a fixed height and full width
          className="border dark:bg-slate-700 border-gray-300 rounded-md p-2" // Add some basic styling
        />
      </div>

      <Button type="submit" disabled={addProductLoading}>
        {addProductLoading ? "Adding..." : "Add Product"}
      </Button>
      {addProductError && (
        <p className="text-red-500">Error: {addProductError.message}</p>
      )}
    </form>
  );
};

export default NewProductForm;
