import React from 'react'
import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { Image as ImageLogo } from 'lucide-react';
import Image from 'next/image';

type Track = {
     artistList: {
          name: string;
     }[];
     id: string;
     name: string;
     cover: {
          name: string;
          imageUrl: string;
     } | null;
     songList: {
          id: string;
          name: string;
          audioUrl: string;
          type: string;
          duration: number;
          size: string;
          firebaseId: string;
     }[],
} 

type props ={
     album: Track ,
     SelectSong:(id:string) => void ,
}

export default function PlayListPage({album , SelectSong}:props) {
     
  return (
     <main className=' flex-1 '>
     
     {/* Album  */}
     <div className=' flex flex-col flex-1 gap-1 bg-slate-500 overflow-y-scroll'>
          {/* Album header */}
          <div className=' relative h-[25%] bg-red-100'>
               <div className=' h-full 0verflow-clip      flex flex-row blur-sm  bg-primary/50  '>
                    {album.cover && (
                         <Image
                              className=' h-full w-full'
                              src={album.cover.imageUrl}
                              alt='Album cover'
                              width={900}
                              height={900}
                         />
                    )}



               </div>
               <div className='z-50 absolute flex flex-row items-center  top-0  w-full h-full  '>
                    {/* the img  */}
                    <div className=' h-40 w-40 rounded border border-primary' >
                         {album.cover && (
                              <Image
                                   className=' h-full w-full'
                                   src={album.cover.imageUrl}
                                   alt='Album cover'
                                   width={900}
                              height={900}
                              />
                         )}

                    </div>
                    <h1>{album.name}</h1>

               </div>

          </div>

          {/* Album songs */}

          <div className=' flex-1 bg-amber-400'>
               <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                         <TableRow>
                              <TableHead className="w-[50px]">#</TableHead>
                              <TableHead>name</TableHead>
                              <TableHead>Artist</TableHead>
                              <TableHead>Duration</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {/* Album songs */}
                         {album.songList.map((song, index) => {
                              return (
                                   <TableRow key={song.id} onClick={() => SelectSong(song.id)}>
                                        <TableCell>{index + 1}</TableCell>
                                        {/* The song name and image and artist */}
                                        <TableCell className=" flex flex-row gap-1">
                                             <div className=" rounded-md overflow-clip h-12 w-12 flex items-center justify-center">
                                                  <ImageLogo />

                                             </div>
                                             <h1>{song.name}</h1>

                                        </TableCell>
                                        {/* Arches contributed */}
                                        <TableCell className=" flex flex-row gap-1 items-center justify-center">
                                             {album.artistList.map((artist, index, list) => {
                                                  const end = list.length - 1
                                                  return (
                                                       <div key={artist.name} className=" flex flex-row p-1">
                                                            <p>{artist.name}</p>
                                                            {index !== end && <p>, </p>}

                                                       </div>
                                                  )
                                             })}


                                        </TableCell>
                                        <TableCell>{song.duration}</TableCell>
                                   </TableRow>
                              )
                         })}
                    </TableBody>
               </Table>

          </div>

     </div>


</main>
  )
}
