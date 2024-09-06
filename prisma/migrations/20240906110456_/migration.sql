/*
  Warnings:

  - You are about to drop the column `birthDay` on the `User` table. All the data in the column will be lost.
  - Added the required column `birth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDay";
ALTER TABLE "User" ADD COLUMN     "birth" STRING NOT NULL;
