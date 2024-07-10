/*
  Warnings:

  - You are about to drop the column `friendId` on the `User_Friends` table. All the data in the column will be lost.
  - Added the required column `user1` to the `User_Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2` to the `User_Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User_Friends" DROP CONSTRAINT "User_Friends_friendId_fkey";

-- AlterTable
ALTER TABLE "User_Friends" DROP COLUMN "friendId",
ADD COLUMN     "user1" TEXT NOT NULL,
ADD COLUMN     "user2" TEXT NOT NULL;
