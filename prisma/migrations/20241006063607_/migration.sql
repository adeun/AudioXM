/*
  Warnings:

  - You are about to drop the column `typeLog` on the `imgFile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `imgFile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playListID]` on the table `imgFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `imgFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playListID` to the `imgFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `imgFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imgFile" DROP COLUMN "typeLog";
ALTER TABLE "imgFile" DROP COLUMN "userId";
ALTER TABLE "imgFile" ADD COLUMN     "firebaseId" STRING NOT NULL;
ALTER TABLE "imgFile" ADD COLUMN     "playListID" STRING NOT NULL;
ALTER TABLE "imgFile" ADD COLUMN     "type" STRING NOT NULL;

-- CreateTable
CREATE TABLE "playList" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" STRING NOT NULL,

    CONSTRAINT "playList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UPlist" (
    "id" STRING NOT NULL,
    "songID" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playListID" STRING NOT NULL,

    CONSTRAINT "UPlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "imgFile_playListID_key" ON "imgFile"("playListID");

-- AddForeignKey
ALTER TABLE "imgFile" ADD CONSTRAINT "imgFile_playListID_fkey" FOREIGN KEY ("playListID") REFERENCES "playList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playList" ADD CONSTRAINT "playList_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UPlist" ADD CONSTRAINT "UPlist_playListID_fkey" FOREIGN KEY ("playListID") REFERENCES "playList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
