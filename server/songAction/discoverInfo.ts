"use server";

import prisma from "../db";

export default async function DiscoverRouteV() {
     
     try {
          const discoverInfo = await prisma.album.findMany({
               select:{
                    cover: true,
                    name: true,
                    id: true
               }
          })
        // Check if any albums were found in the database
          if (!discoverInfo || discoverInfo.length === 0) {
               throw new Error("No albums found in the database.");
          }
          
          return discoverInfo
          
     } catch (error) {
          console.error("Error fetching albums from Prisma: ", error);
          return []; // Return an empty array to avoid breaking the frontend
          
     }
     
    
     
}