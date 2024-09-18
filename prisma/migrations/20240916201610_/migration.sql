-- CreateTable
CREATE TABLE "Album" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "release_date" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumImg" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,
    "name" STRING NOT NULL,
    "type" STRING NOT NULL,
    "size" STRING NOT NULL,
    "duration" INT4 NOT NULL,
    "authorId" STRING NOT NULL,
    "albumId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artistList" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "albumId" STRING NOT NULL,

    CONSTRAINT "artistList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioImg" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,
    "name" STRING NOT NULL,
    "type" STRING NOT NULL,
    "size" STRING NOT NULL,
    "duration" INT4 NOT NULL,
    "authorId" STRING NOT NULL,
    "AudioId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlbumImg_albumId_key" ON "AlbumImg"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "AudioImg_AudioId_key" ON "AudioImg"("AudioId");

-- AddForeignKey
ALTER TABLE "AlbumImg" ADD CONSTRAINT "AlbumImg_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artistList" ADD CONSTRAINT "artistList_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioImg" ADD CONSTRAINT "AudioImg_AudioId_fkey" FOREIGN KEY ("AudioId") REFERENCES "AudioFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
