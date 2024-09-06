/*
  Warnings:

  - Changed the type of `PhoneNumber` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "PhoneNumber";
ALTER TABLE "User" ADD COLUMN     "PhoneNumber" INT8 NOT NULL;
