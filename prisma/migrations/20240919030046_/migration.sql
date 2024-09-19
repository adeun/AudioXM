-- DropForeignKey
ALTER TABLE "AlbumImg" DROP CONSTRAINT "AlbumImg_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AudioFile" DROP CONSTRAINT "AudioFile_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AudioImg" DROP CONSTRAINT "AudioImg_AudioId_fkey";

-- DropForeignKey
ALTER TABLE "artistList" DROP CONSTRAINT "artistList_albumId_fkey";

-- AddForeignKey
ALTER TABLE "AlbumImg" ADD CONSTRAINT "AlbumImg_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artistList" ADD CONSTRAINT "artistList_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioFile" ADD CONSTRAINT "AudioFile_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioImg" ADD CONSTRAINT "AudioImg_AudioId_fkey" FOREIGN KEY ("AudioId") REFERENCES "AudioFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
