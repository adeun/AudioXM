"use server";

import prisma from "../db";

export default async function AddToPlaylist({playlistID , userID ,songID }:{playlistID:string , userID:string , songID:string}) {
     // Implement adding a song to a playlist
     try {
          let status = false;
          const updatedPlaylist = await prisma.playList.update({
               where:{
                    userID:userID,
                    id: playlistID
               },
               data:{
                    UPlist:{
                         create:{
                              songID:songID
                         }
                    }
               }
          })
          if (updatedPlaylist) {
               status = true;
          }

          return {status: status}
          
     } catch (error) {
          console.error("Error adding song to playlist", error);
          throw error
          
     }

     
}