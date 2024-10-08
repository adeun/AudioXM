"use server"

import prisma from "../db";

export default async function GetAlbumAll() {
     try {
          
          
          const allAlbum = await prisma.album.findMany({
               select: {
                    name: true,
                    id: true,
                    cover: true
               }
          })
          if (!allAlbum || allAlbum.length === 0) {
               console.log("No albums found in the database");
               throw new Error("No albums found in the database.");
             

          }
         

          return allAlbum

     } catch (error) {
          console.error("Error fetching albums from Prisma: ", error);
          return []

     }

}