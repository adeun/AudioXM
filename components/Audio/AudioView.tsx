"use client"
import React, { useState, useEffect, useRef } from 'react'
import AudioBar from './AudioBar';
import useSound from 'use-sound';
import { toAudioAsBase64 } from '@/lib/Bass64';
import AudioListCard from './AudioListCard';
import { LoaderCircle, Plus } from 'lucide-react';
type AudioList = {
     path: string;
     duration: number;
     name: string;
     id: string;
     author: string[];
}
import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"

export default function AudioView() {
     const [isMounted, setIsMounted] = useState(false);
     const audioRef = useRef<HTMLAudioElement>(null);
     const [listSongs, setListSongs] = useState<AudioList[] | []>([])
     const [playSong, setPlaySong] = useState(false);
     const [currentSong, setCurrentSong] = useState(0);
     const [songs, setSongs] = useState({
          name: "",
          path: "",
          currentTime: 0,
          duration: 0,

     });


     // check if everything is mounted first
     useEffect(() => {
          // Simulate async task (e.g., fetching data, waiting for all components to mount)
          const timer = setTimeout(() => {
               setIsMounted(true);
          }, 500); // Adjust time if needed

          return () => clearTimeout(timer);
     }, []);

     // this use effect helps to use the Ford back buttons to change the songs
     useEffect(() => {
          const getSong = listSongs.filter((mainSong, index) => index === currentSong)
          if (getSong[0]) {
               setSongs(preData => ({ ...preData, path: getSong[0].path, name: getSong[0].name, duration: getSong[0].duration }))

          }
     }, [currentSong, listSongs])



     




     // Select Song from the list of songs on the table
     function SelectSong(id: string) {
          const index = listSongs.findIndex((song) => song.id === id);
          const song = listSongs.filter((song) => song.id === id);
          console.log("SelectSong ===", {
               index,
               song
          });
          setCurrentSong(index);
          setSongs(preData => ({ ...preData, path: song[0].path, name: song[0].name, duration: song[0].duration }))
          //setAutoPlay(true)
          setPlaySong(true)


     }
     if (!isMounted) {
          return <div className=' flex-1 flex items-center justify-center'>
               <LoaderCircle className=' animate-spin' size={78} />
          </div>;
     }





     return (
          <>
               {/* Sidebar for albums on playlist */}
               <div className=' flex flex-col gap-2 p-2 w-[4%]  border-r-[1.5px] border-border'>
                    <div className=' flex items-center justify-center bg-primary/15 hover:bg-primary/30 text-primary-foreground rounded-md p-1 '>
                         <Plus size={40} />

                    </div>

               </div>

               {/* Audio player  Audio list */}
               <div className=' flex flex-1 flex-col w-[71%]'>


                    {/* 
                         Users playlist, and the Discover page
                     */}

                    <div className=' flex flex-1 flex-col gap-2 p-1'>
                         {/* {listSongs.map((song , index) => {
                              return (
                                   <AudioListCard
                                        key={song.id}
                                        id={song.id}
                                        name={song.name}
                                        img={song.path}
                                        author={song.author}
                                        SelectSong={SelectSong}
                                        songsDuration={song.duration}
                                        index={index + 1} 
                                   />
                              )

                         })} */}
                         <Table className=' text-base'>

                              <TableHeader>
                                   <TableRow>
                                        <TableHead className="w-[4%]">#</TableHead>
                                        <TableHead className="w-[43%]">Title</TableHead>
                                        <TableHead className="w-[43%]">Artist</TableHead>
                                        <TableHead className="w-[10%]" >Duration</TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody className=''>
                                   {listSongs.map((song, index) => {

                                        return (
                                             <AudioListCard
                                                  key={song.id}
                                                  id={song.id}
                                                  name={song.name}
                                                  img={song.path}
                                                  author={song.author}
                                                  SelectSong={SelectSong}
                                                  songsDuration={song.duration}
                                                  index={index}
                                             />
                                        )
                                   })}

                              </TableBody>
                         </Table>



                    </div>




                    <div className=' flex items-center justify-center p-2'>
                         {/* 
                             Audio player controls, and play/pause button, progress bar, and time display
                         
                         */}

                         <AudioBar
                              songs={songs}
                              setSongs={setSongs}
                              currentSong={currentSong}
                              setCurrentSong={setCurrentSong}
                              listSongs={listSongs}
                              setPlaySong={setPlaySong}
                              playSong={playSong}
                         />
                    </div>
               </div>



               <div className=' flex flex-col w-[25%] gap-2 p-2 border-r-[1.5px] border-border'>
                    <div className=' w-full h-[45%] flex items-center justify-center bg-primary/15 hover:bg-primary/30 text-primary-foreground rounded-md p-1 '>


                    </div>
                    <div>
                         <h1 className=' text-3xl line-clamp-1'>{songs.name}</h1>
                    </div>

               </div>


          </>
     )
}
