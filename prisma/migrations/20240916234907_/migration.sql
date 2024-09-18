/*
  Warnings:

  - You are about to drop the column `userId` on the `AudioFile` table. All the data in the column will be lost.
  - Added the required column `firebaseId` to the `AlbumImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseId` to the `AudioFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlbumImg" ADD COLUMN     "firebaseId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "AudioFile" DROP COLUMN "userId";
ALTER TABLE "AudioFile" ADD COLUMN     "firebaseId" STRING NOT NULL;
