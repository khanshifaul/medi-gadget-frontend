import { db } from "@/lib/db";
import { cache } from "react";

// Get product category by ID
export const getProductCategoryById = cache(async (id: string) => {
  try {
    const productCategory = await db.productCategory.findUnique({
      where: { id },
    });
    if (!productCategory) {
      throw new Error(`Product category with ID ${id} not found.`);
    }
    return productCategory;
  } catch (error) {
    throw new Error(
      `Failed to fetch product category by ID: ${(error as Error).message}`
    );
  }
});

// Get all product categories
export const getProductCategories = cache(async () => {
  try {
    const productCategories = await db.productCategory.findMany();
    return productCategories;
  } catch (error) {
    throw new Error(
      `Failed to fetch product categories: ${(error as Error).message}`
    );
  }
});

// Get product categories by name
export const getProductCategoriesByName = cache(async (name: string) => {
  try {
    const productCategories = await db.productCategory.findMany({
      where: { name },
    });
    return productCategories;
  } catch (error) {
    throw new Error(
      `Failed to fetch product categories by name: ${(error as Error).message}`
    );
  }
});

// Get product categories with filters
export const getProductCategoriesWithFilters = cache(async (filters: any) => {
  try {
    const productCategories = await db.productCategory.findMany({
      where: filters, // Assuming filters is an object with the necessary fields
    });
    return productCategories;
  } catch (error) {
    throw new Error(
      `Failed to fetch product categories with filters: ${
        (error as Error).message
      }`
    );
  }
});
