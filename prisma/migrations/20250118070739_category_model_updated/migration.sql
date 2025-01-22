/*
  Warnings:

  - Added the required column `thumbnail` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "thumbnail" TEXT NOT NULL;
