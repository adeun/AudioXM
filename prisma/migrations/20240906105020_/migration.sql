/*
  Warnings:

  - Added the required column `PhoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDay` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PhoneNumber" INT4 NOT NULL;
ALTER TABLE "User" ADD COLUMN     "birthDay" STRING NOT NULL;
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
