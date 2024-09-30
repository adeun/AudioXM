-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Subscribed" BOOL NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN     "SubscriptionDate" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOL NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN     "isArtist" BOOL NOT NULL DEFAULT false;
