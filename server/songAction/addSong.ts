"use server";

import { z } from "zod";
import prisma from "../db";
import { AlbumUploadForm } from "@/lib/ZOD";
import { uploadBase64 } from "../FireBaseConfig/FirebaseSDK";
type Audon = {

}
export default async function AddSong({ data, userId }: { data: z.infer<typeof AlbumUploadForm>, userId: string, }) {

     try {
          let imgUrl: { url: string; id: string; } | null = null;
          if (data.cover) {
               imgUrl = await uploadBase64(data.cover?.path, "ImageFileStorage")
          }

          const songs = await Promise.all(data.songs.map(async (item) => {
               const firebase = await uploadBase64(item.path, "AudioFileStorage")
               return {
                    name: item.name,
                    type: item.type,
                    size: item.size,
                    duration: item.duration,
                    firebaseId: firebase.id,
                    imageUrl:firebase.url

               }
          }))

          const album = await prisma.album.create({
               data: {
                    name: data.name,
                    release_date: data.release_date,
                    authorId: userId,
                    artistList: {
                         createMany: {
                              data: data.artist.map((artist) => ({ name: artist }))
                         }
                    },
                    ...(imgUrl && data.cover ? {
                         cover: {
                              create: {
                                   imageUrl: imgUrl.url,
                                   name: data.cover.name,
                                   size: data.cover.size,
                                   type: data.cover.type,
                                   firebaseId: imgUrl.id
                              }
                         },

                    } : {}),
                    songList:{
                         createMany: {
                              data: songs
                         }
                    }

                    

                    
               }
          })
     } catch (error) {

     }


}