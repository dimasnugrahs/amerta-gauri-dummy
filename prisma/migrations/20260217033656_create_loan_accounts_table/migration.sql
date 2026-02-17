/*
  Warnings:

  - You are about to alter the column `principal_amount` on the `loan_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `rate_percent` on the `loan_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `rate_amount` on the `loan_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `current_debt_principal` on the `loan_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `current_debt_interest` on the `loan_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "loan_accounts" ALTER COLUMN "principal_amount" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "rate_percent" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "rate_amount" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "current_debt_principal" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "current_debt_interest" SET DATA TYPE DECIMAL(15,2);
