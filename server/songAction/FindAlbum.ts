"use server";

import prisma from "../db";

export default async function FindAlbum({albumId}:{albumId:string}) {
     try {
         
          
          const album = await prisma.album.findUnique({
               where: {
                    id: albumId
               },
               select: {
                    name: true,
                    id: true,
                    cover:{
                         select: {
                              imageUrl: true,
                              name: true
                         }
                    },
                   songList: {
                     select: {
                              name: true,
                              type: true,
                              duration: true,
                              size: true,
                              firebaseId: true,
                              audioUrl: true,
                              id: true
                         }
 
                   },
                    artistList: {
                         select: {
                              name: true
                         }
                    }
               }
          })
          return album
     } catch (error) {
          console.error("Error finding album by id ", albumId, error);
          throw error
     }
     
}