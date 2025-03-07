-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "isActive" SET DEFAULT false,
ALTER COLUMN "hashedToken" DROP NOT NULL;
