/*
  Warnings:

  - You are about to drop the column `comment` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "comment",
DROP COLUMN "order";
