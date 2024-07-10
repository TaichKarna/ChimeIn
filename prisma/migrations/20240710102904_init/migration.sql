/*
  Warnings:

  - Added the required column `contactName` to the `User_Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User_Chats" ADD COLUMN     "contactName" TEXT NOT NULL;
