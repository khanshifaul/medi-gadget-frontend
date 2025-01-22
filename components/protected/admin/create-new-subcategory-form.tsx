"use client";
import { ADD_PRODUCT_SUBCATEGORY } from "@/app/api/graphql/mutation";
import { GET_CATEGORIES } from "@/app/api/graphql/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProductCategory } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewProductSubCategoryForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    categoryId: "",
  });

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);
  const categories: IProductCategory[] =
    categoriesData?.productCategories || [];

  const [addProductSubCategory, { loading, error }] = useMutation(
    ADD_PRODUCT_SUBCATEGORY,
    {
      onCompleted: () => {
        router.push("/admin/subcategories");
      },
    }
  );

  const handleChange = (value: string, name: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.categoryId) {
      alert("Please fill in all required fields.");
      return;
    }
    addProductSubCategory({ variables: { ...formState } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={formState.name}
        onChange={(e) => handleChange(e.target.value, "name")}
        placeholder="Subcategory Name"
        required
      />
      {categoriesLoading && <p>Loading categories...</p>}
      {categoriesError && (
        <p className="text-red-500">
          Error loading categories: {categoriesError.message}
        </p>
      )}
      {!categoriesLoading && !categoriesError && (
        <Select
          value={formState.categoryId}
          onValueChange={(value) => handleChange(value, "categoryId")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Subcategory"}
      </Button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
};

export default NewProductSubCategoryForm;
