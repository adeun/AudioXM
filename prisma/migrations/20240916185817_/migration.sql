-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('songImg', 'album');

-- CreateTable
CREATE TABLE "imgFile" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,
    "name" STRING NOT NULL,
    "typeLog" "ImageType" NOT NULL,
    "size" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imgFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioFile" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,
    "name" STRING NOT NULL,
    "type" STRING NOT NULL,
    "size" STRING NOT NULL,
    "duration" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioFile_pkey" PRIMARY KEY ("id")
);
