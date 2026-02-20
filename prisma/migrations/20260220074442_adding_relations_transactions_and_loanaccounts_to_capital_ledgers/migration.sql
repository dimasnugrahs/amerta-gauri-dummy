/*
  Warnings:

  - The values [LOAN,OPS] on the enum `TypeCapitalLedger` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `amount` on the `capital_ledgers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeCapitalLedger_new" AS ENUM ('INJECTION', 'WITHDRAWAL', 'DISBURSEMENT', 'REPAYMENT_PRINCIPAL', 'REPAYMENT_INTEREST', 'EXPENSE_OPS', 'ADJUSTMENT');
ALTER TABLE "public"."capital_ledgers" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "capital_ledgers" ALTER COLUMN "type" TYPE "TypeCapitalLedger_new" USING ("type"::text::"TypeCapitalLedger_new");
ALTER TYPE "TypeCapitalLedger" RENAME TO "TypeCapitalLedger_old";
ALTER TYPE "TypeCapitalLedger_new" RENAME TO "TypeCapitalLedger";
DROP TYPE "public"."TypeCapitalLedger_old";
ALTER TABLE "capital_ledgers" ALTER COLUMN "type" SET DEFAULT 'INJECTION';
COMMIT;

-- AlterTable
ALTER TABLE "capital_ledgers" ADD COLUMN     "loan_account_id" TEXT,
ADD COLUMN     "transaction_id" TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(20,2);

-- AddForeignKey
ALTER TABLE "capital_ledgers" ADD CONSTRAINT "capital_ledgers_loan_account_id_fkey" FOREIGN KEY ("loan_account_id") REFERENCES "loan_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_ledgers" ADD CONSTRAINT "capital_ledgers_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
