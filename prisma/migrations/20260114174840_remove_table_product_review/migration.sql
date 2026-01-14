/*
  Warnings:

  - You are about to drop the `product_reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_userId_fkey";

-- DropTable
DROP TABLE "product_reviews";
