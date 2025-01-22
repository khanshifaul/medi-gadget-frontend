"use client";
import { ADD_PRODUCT_CATEGORY } from "@/app/api/graphql/mutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewProductCategoryForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    thumbnail: "",
  });

  const [addProductCategory, { loading, error }] = useMutation(
    ADD_PRODUCT_CATEGORY,
    {
      onCompleted: () => {
        router.push("/admin/categories");
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProductCategory({ variables: { ...formState } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Category Name"
        required
      />
      <Input
        name="thumbnail"
        value={formState.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Category"}
      </Button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default NewProductCategoryForm;
