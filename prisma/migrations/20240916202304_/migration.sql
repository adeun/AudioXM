/*
  Warnings:

  - You are about to drop the column `authorId` on the `AlbumImg` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "authorId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "AlbumImg" DROP COLUMN "authorId";
