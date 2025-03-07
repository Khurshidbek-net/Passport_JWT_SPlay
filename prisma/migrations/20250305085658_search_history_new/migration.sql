/*
  Warnings:

  - You are about to drop the column `search_history` on the `search_history` table. All the data in the column will be lost.
  - Added the required column `search_query` to the `search_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "search_history" DROP COLUMN "search_history",
ADD COLUMN     "search_query" TEXT NOT NULL;
