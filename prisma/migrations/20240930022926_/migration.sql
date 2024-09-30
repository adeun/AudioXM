/*
  Warnings:

  - You are about to drop the column `SubscriptionDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "SubscriptionDate";

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "price" FLOAT8 NOT NULL,
    "duration" INT4 NOT NULL,
    "isFeatured" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" STRING NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_userID_key" ON "SubscriptionPlan"("userID");

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
