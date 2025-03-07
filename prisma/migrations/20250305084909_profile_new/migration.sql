/*
  Warnings:

  - You are about to drop the column `language_id` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profile` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "language_id",
DROP COLUMN "user_id",
ADD COLUMN     "languageId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
