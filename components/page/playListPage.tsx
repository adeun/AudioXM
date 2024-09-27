"use client"
import React, { useEffect, useState, useRef } from 'react'
import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { Image as ImageLogo, Plus } from 'lucide-react';
import Image from 'next/image';
import { AudioPlayer } from '../hook/audioPlayer';
import AudioBar2 from '../Audio/AudioBar2';

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

type props = {
     album: Track,

}

export default function PlayListPage({ album }: props) {
     const { SelectSong, song, currentPlaylistPosition, PlaylistLength, setCurrentPlaylistPosition } = AudioPlayer({ playList: album.songList })
     const [rgbToHex, setRgbToHex] = useState("#000000");
     const canvasRef = useRef<HTMLCanvasElement>(null)
     useEffect(() => {
          if (canvasRef.current) {
               const ctx = canvasRef.current.getContext('2d');// Get a 2-D reference to the cannabis
               if (ctx && album.cover) {
                    const nativeImage = new window.Image();
                    nativeImage.crossOrigin = 'anonymous'; // This tells the browser to make a cross-origin request
                    nativeImage.src = album.cover.imageUrl;
                    nativeImage.onload = () => {


                         ctx.drawImage(nativeImage, 1, -nativeImage.height / 2)
                         // get the original image dimensions from the original image
                         const imageData = ctx.getImageData(0, 0, nativeImage.width, nativeImage.height);
                         const data = imageData.data;
                         if (data) {
                              let redSum = 0, greenSum = 0, blueSum = 0;
                              const pixelCount = data.length / 3; // Each pixel has 4 values (R, G, B, A)

                              // Loop through every pixel (4 values per pixel: R, G, B, A)
                              for (let i = 0; i < data.length; i += 4) {
                                   redSum += data[i];     // Red
                                   greenSum += data[i + 1]; // Green
                                   blueSum += data[i + 2];  // Blue
                              }
                              // Calculate the average for each color channel
                              const avgRed = 255 - (Math.floor(redSum / pixelCount));
                              const avgGreen = 255 - (Math.floor(greenSum / pixelCount));
                              const avgBlue = 255- (Math.floor(blueSum / pixelCount));
                              const averageColorRGB = `#${((1 << 24) + (avgRed << 16) + (avgGreen << 8) + avgBlue).toString(16).slice(1).toUpperCase()}`;
                              setRgbToHex(averageColorRGB);
                              console.log(averageColorRGB);


                         }



                    }
                    nativeImage.onerror = (e) => {
                         console.error('Failed to load image', e);
                    }



               }
          }
     }, [canvasRef, album])
     function fullTime(ses: number) {
          const minutes = Math.floor(ses / 60); // Calculate minutes
          const seconds = Math.floor(ses % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`


     }



     return (
          <>
               <main className=' grid grid-cols-[6%_94%] flex-1  gap-1 h-full overflow-hidden mt-1 '>
                    {/* user playList */}
                    <div className=' h-full w-full flex justify-center p-1 rounded-sm border border-border '>
                         <div className=' flex  items-center justify-center w-20 h-20 rounded-md bg-border/50'>
                              <Plus />

                         </div>

                    </div>

                    {/* Album  */}
                    <main className=' flex flex-col gap-2 w-full h-full overflow-hidden rounded-sm border border-border'>
                         {/* Album header */}
                         <div className=' relative flex flex-row h-[275px] overflow-hidden bg-red-100'>
                              {/* Image blur */}
                              <div className='z-40 backdrop-blur-xl    absolute  w-full h-full  '>


                              </div>
                              <div className='z-30  absolute flex overflow-hidden  w-full h-full  '>
                                   <canvas className=' flex-1 ' ref={canvasRef}>

                                   </canvas>

                              </div>

                              {/* Album name and artist */}

                              <div className=' z-50  absolute flex flex-row items-center gap-2 top-[20%] left-[1%]'>
                                   <div className=' flex h-44 w-44 rounded-sm overflow-clip'>

                                        {album.cover && <Image
                                             className="object-cover w-full h-full "
                                             src={album.cover?.imageUrl}
                                             alt="Album Cover"
                                             width={300}
                                             height={300}
                                        />}

                                   </div>
                                   <h1 style={{ color: rgbToHex }} className={` text-5xl  font-semibold`}>{album.name}</h1>
                              </div>




                         </div>

                         {/* Album songs */}

                         <div className=' flex-1 w-full  '>
                              <Table className='w-full '>
                                   <TableCaption>A list of your recent invoices.</TableCaption>
                                   <TableHeader>
                                        <TableRow>
                                             <TableHead className="w-[50px]">#</TableHead>
                                             <TableHead>name</TableHead>

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
                                                       <TableCell className=" flex flex-row items-center j gap-1">
                                                            <div className=" rounded-md overflow-clip  w-12 flex items-center justify-center">
                                                                 <ImageLogo size={45} />

                                                            </div>
                                                            <h1>{song.name}</h1>

                                                       </TableCell>

                                                       <TableCell>{fullTime(song.duration)}</TableCell>
                                                  </TableRow>
                                             )
                                        })}
                                   </TableBody>
                              </Table>

                         </div>

                    </main>


               </main>
               <div className=' flex  items-center justify-center p-1'>
                    <AudioBar2
                         currentSong={currentPlaylistPosition}
                         setCurrentSong={setCurrentPlaylistPosition}
                         mainSong={song}
                         PlaylistLength={PlaylistLength} />

               </div>

          </>

     )
}
