-- CreateTable
CREATE TABLE "User_Friends" (
    "id" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "User_Friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Friends" ADD CONSTRAINT "User_Friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
