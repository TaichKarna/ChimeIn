/*
  Warnings:

  - You are about to drop the column `recipientId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_recipientId_fkey";

-- DropIndex
DROP INDEX "Message_recipientId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "recipientId";
