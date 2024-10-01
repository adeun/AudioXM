/*
  Warnings:

  - You are about to drop the column `Subscribed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "Subscribed" BOOL NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Subscribed";
