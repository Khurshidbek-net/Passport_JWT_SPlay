/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `admins` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedToken` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "passwordHash",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashedToken" DROP NOT NULL;
