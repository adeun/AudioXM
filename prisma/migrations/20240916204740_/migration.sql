/*
  Warnings:

  - You are about to drop the column `duration` on the `AlbumImg` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AlbumImg` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlbumImg" DROP COLUMN "duration";
ALTER TABLE "AlbumImg" DROP COLUMN "userId";
