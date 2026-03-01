-- AlterEnum
ALTER TYPE "TypeCapitalLedger" ADD VALUE 'INTEREST_ACCRUAL';

-- CreateTable
CREATE TABLE "EomLog" (
    "id" TEXT NOT NULL,
    "period_month" INTEGER NOT NULL,
    "period_year" INTEGER NOT NULL,
    "executed_by_id" TEXT NOT NULL,
    "total_accounts" INTEGER NOT NULL,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EomLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EomLog_period_month_period_year_key" ON "EomLog"("period_month", "period_year");

-- AddForeignKey
ALTER TABLE "EomLog" ADD CONSTRAINT "EomLog_executed_by_id_fkey" FOREIGN KEY ("executed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
