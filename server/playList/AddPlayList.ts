"use server";

import { FileDetails } from "@/lib/type";
import prisma from "../db";
import { uploadBase64 } from "../FireBaseConfig/FirebaseSDK";

export default async function AddPlayList({ info, uaserID }: { info: { name: string, file: FileDetails | null }, uaserID: string }) {
     try {
          const updataFile = info.file ? await uploadBase64(info.file.path, "ProfileImage") : null;
          // Define the data object for the playlist creation
          let playlistData: any = {


          };

          // If there's a file, add it to the playlist data
          if (updataFile && info.file) {
               playlistData = {
                    name: updataFile.id,
                    imageUrl: updataFile.url,
                    firebaseId: updataFile.id,
                    type: info.file.type,
                    size: info.file.size,

               };
          }

          const updataUser = await prisma.user.update({
               where: {
                    id: uaserID
               },
               data: {
                    playList: {
                         create: {
                              name: info.name,
                              description: "",
                              ...(updataFile && info.file && {
                                   file: {
                                        create: {
                                             name: updataFile.id,
                                             imageUrl: updataFile.url,
                                             firebaseId: updataFile.id,
                                             type: info.file.type,
                                             size: info.file.size
                                        }
                                   }
                              })


                         }
                    }
               }

          });


     } catch (error) {
          console.error('Error adding playlist:', error);

     }

}