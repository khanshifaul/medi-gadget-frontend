import { db } from "@/lib/db";
import { ProductStatus } from "@prisma/client"; // Import the ProductStatus enum
import { cache } from "react";

// Get all products
export const getProducts = cache(async () => {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        subcategory: true,
      },
    });
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    // Type assertion to Error
    throw new Error(`Failed to fetch products: ${(error as Error).message}`);
  }
});

// Get a product by ID
export const getProductById = cache(async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    // Type assertion to Error
    throw new Error(
      `Failed to fetch product by ID: ${(error as Error).message}`
    );
  }
});

// Get products by name
export const getProductByName = cache(async (name: string) => {
  try {
    const products = await db.product.findMany({
      where: { name },
    });
    return products;
  } catch (error) {
    // Type assertion to Error
    throw new Error(
      `Failed to fetch products by name: ${(error as Error).message}`
    );
  }
});

// Get products by category
export const getProductsByCategory = cache(async (categoryId: string) => {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId: categoryId, // Use categoryId to filter products
      },
    });
    return products;
  } catch (error) {
    // Type assertion to Error
    throw new Error(
      `Failed to fetch products by category: ${(error as Error).message}`
    );
  }
});

// Get products by status
export const getProductsByStatus = cache(async (status: ProductStatus) => {
  // Change type to ProductStatus
  try {
    const products = await db.product.findMany({
      where: {
        status: status, // Use the ProductStatus enum
      },
    });
    return products;
  } catch (error) {
    // Type assertion to Error
    throw new Error(
      `Failed to fetch products by status: ${(error as Error).message}`
    );
  }
});
