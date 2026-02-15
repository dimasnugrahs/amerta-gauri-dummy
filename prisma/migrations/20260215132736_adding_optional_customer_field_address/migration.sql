-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "phone_number" SET DEFAULT 'Data masih kosong',
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" SET DEFAULT 'Data masih kosong';
