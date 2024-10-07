"use server";

import prisma from "../db";
type userPLayList = {
     id: string;
     name: string;
     songList: {
          id: string;
          name: string;
          audioUrl: string;
          type: string;
          duration: number;
          size: string;
          firebaseId: string;
     }[];
     cover: {
          name: string;
          imageUrl: string;
     } | null;
}
export default async function GetUserPlayList({ playlistsID, userID }: { playlistsID: string, userID: string }) {
     try {
          const userPlayList = await prisma.playList.findFirst({
               where: {
                    userID: userID,
                    id: playlistsID
               },
               select: {
                    id: true,
                    name: true,
                    file: {
                         select: {
                              name: true,
                              imageUrl: true,
                         }
                    },
                    UPlist: {
                         select: {
                              songID: true,
                         }
                    }
               }
          })
          if (!userPlayList) {
               return null;
          }
          const songs = await Promise.all(
               userPlayList.UPlist.map(async (song) => {
                    const songData = await prisma.audioFile.findUnique({
                         where: {
                              id: song.songID
                         },
                         select: {
                              id: true,
                              name: true,
                              type: true,
                              duration: true,
                              size: true,
                              firebaseId: true,
                              audioUrl: true,
                         }
                    })
                    if (!songData) {
                         return null;
                    }
                    return {
                         id: songData.id,
                         name: songData.name,
                         type: songData.type,
                         duration: songData.duration,
                         size: songData.size,
                         firebaseId: songData.firebaseId,
                         audioUrl: songData.audioUrl,
                    }
               })

          )
          const playListU = {
               id: userPlayList.id,
               name: userPlayList.name,
               cover: userPlayList.file,
               songList: songs.filter(song => song !== null),
          }


          return playListU ? playListU : null
     } catch (error) {
          console.error("Error fetching user playlists", error);
          throw error
     }

}