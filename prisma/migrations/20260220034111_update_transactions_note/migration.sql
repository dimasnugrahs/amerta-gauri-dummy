/*
  Warnings:

  - You are about to alter the column `amount_paid` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `principal_cut` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `interest_cut` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `remaining_principal` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `remaining_interest` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount_paid" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "principal_cut" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "interest_cut" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "remaining_principal" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "remaining_interest" SET DATA TYPE DECIMAL(15,2);
