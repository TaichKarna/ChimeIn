/*
  Warnings:

  - You are about to drop the column `groupChatId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `groupChatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `GroupChat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,chatId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_groupChatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_groupChatId_fkey";

-- DropIndex
DROP INDEX "Membership_userId_groupChatId_key";

-- DropIndex
DROP INDEX "Message_groupChatId_idx";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "groupChatId",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "groupChatId",
ADD COLUMN     "chatId" TEXT;

-- DropTable
DROP TABLE "GroupChat";

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_chatId_key" ON "Membership"("userId", "chatId");

-- CreateIndex
CREATE INDEX "Message_chatId_idx" ON "Message"("chatId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
