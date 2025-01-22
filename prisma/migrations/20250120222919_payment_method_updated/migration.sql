/*
  Warnings:

  - The values [DEBIT_CARD,UPI,BANK_TRANSFER,WALLET] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH_ON_DELIVERY', 'CREDIT_CARD', 'BKASH', 'NAGAD', 'ROCKET');
ALTER TABLE "orders" ALTER COLUMN "paymentMethod" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
ALTER TABLE "orders" ALTER COLUMN "paymentMethod" SET DEFAULT 'CASH_ON_DELIVERY';
COMMIT;
