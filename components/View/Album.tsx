"use client";
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

import { Session } from 'next-auth'
import React, { useState, useEffect, useCallback } from 'react'
import Nav2 from '../NavVersions/Nav2';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import DiscoverRouteV from '@/server/songAction/discoverInfo';
import GetAlbumAll from '@/server/songAction/getAlbumAll';
import FindAlbum from '@/server/songAction/FindAlbum';
import AudioBar2 from "../Audio/AudioBar2";
type Component = {
     user: Session
}



type AAA = {
     name: string;
     id: string;
     cover: {
          name: string;
          id: string;
          createdAt: Date;
          updatedAt: Date;
          imageUrl: string;
          type: string;
          size: string;
          albumId: string;
          firebaseId: string;
     } | null;
}[]

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
} | null

type songList = {
     id: string;
     name: string;
     imageUrl: string;
     type: string;
     duration: number;
     size: string;
     firebaseId: string;
}

async function fetchAlbums() {
     const response = await fetch('/api/discover');
     if (!response.ok) {
          throw new Error('Failed to fetch albums');
     }
     const data: AAA = await response.json();
     return data;
}
export default function Album({ user }: Component) {
     const {
          data: allPlaylists,
          isLoading,
          error,
     } = useQuery({
          queryKey: ['allPlaylists'], // Unique key for caching and refetching
          queryFn: fetchAlbums,
     });
     const getAlbum = useMutation({
          mutationFn: FindAlbum
     })
     const [search, setSearch] = useState("");
     const [activeView, setActiveView] = useState<"AlbumView" | "DiscoverView">("DiscoverView");
     const [mainAlbum, setMainAlbum] = useState<Track>(null)
     const [currentSong, setCurrentSong] = useState(0)

     const [activeSong, setActiveSong] = useState({
          name: "",
          path: "",
          currentTime: 0,
          duration: 0,
          id: ""

     });
     // after nutrition is complete check if we have valid data, then set the valid data and also switch the view
     useEffect(() => {
          if (getAlbum.data) {
               const mainAudio = getAlbum.data
               setMainAlbum(mainAudio)
               setActiveView("AlbumView")


          } else {
               setMainAlbum(null)
          }
     }, [getAlbum.data])
     // This allows the audio player to switch between different songs using the in
     useEffect(() => {
          if (mainAlbum) {
               const playlist = mainAlbum?.songList
               if (playlist ) {
                    setActiveSong({
                         name: playlist[currentSong].name,
                         path: playlist[currentSong].audioUrl,
                         currentTime: 0,
                         duration: playlist[currentSong].duration,
                         id: playlist[currentSong].id
                    })
               }
          }
     },[currentSong , mainAlbum])




     // Get the album that was correct in the discovery part
     function openAlbum(id: string) {
          getAlbum.mutate({ albumId: id });

     }
     // select a song from the album
     function SelectSong(id: string) {
          const playlist = mainAlbum?.songList
          if (playlist) {
               const song = playlist.filter(song => song.id === id)
               setActiveSong({
                    name: song[0].name,
                    path: song[0].audioUrl,
                    currentTime: 0,
                    duration: song[0].duration,
                    id: song[0].id
               })

          }


     }




     return (
          <>
               <Nav2 user={user} Search={{ searchValue: search, setSearchValue: setSearch }} />
               {activeView === "AlbumView" && mainAlbum &&
                    <>
                         <main className=' grid grid-cols-[6%_94%] flex-1 '>
                              {/* user Album list */}
                              <div className=' flex flex-col gap-2  h-full  border-r-[1.5px]  border-primary'>
                                   Album 1
                              </div>
                              {/* Album  */}
                              <div className=' flex flex-col flex-1 gap-1 bg-slate-500 overflow-y-scroll'>
                                   {/* Album header */}
                                   <div className=' relative h-[25%] bg-red-100'>
                                        <div className=' h-full 0verflow-clip      flex flex-row blur-sm  bg-primary/50  '>
                                             {mainAlbum.cover && (
                                                  <Image
                                                       className=' h-full w-full'
                                                       src={mainAlbum.cover.imageUrl}
                                                       alt='Album cover'
                                                       width={900}
                                                       height={900}
                                                  />
                                             )}



                                        </div>
                                        <div className='z-50 absolute flex flex-row items-center  top-0  w-full h-full  '>
                                             {/* the img  */}
                                             <div className=' h-40 w-40 rounded border border-primary' >
                                                  {mainAlbum.cover && (
                                                       <Image
                                                            className=' h-full w-full'
                                                            src={mainAlbum.cover.imageUrl}
                                                            alt='Album cover'
                                                            width={900}
                                                       height={900}
                                                       />
                                                  )}

                                             </div>
                                             <h1>{mainAlbum.name}</h1>

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
                                                  {mainAlbum.songList.map((song, index) => {
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
                                                                      {mainAlbum.artistList.map((artist, index, list) => {
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


                    </>
               }

               {activeView === "DiscoverView" && <>
                    <main className='grid grid-cols-[6%_94%] flex-1 '>
                         {/* user Album list */}
                         <div className=' flex flex-col gap-2  h-full  border-r-[1.5px]  border-primary'>
                              Album 1
                         </div>
                         {/*  */}
                         <div className=' flex flex-row gap-3 p-2 h-80'>
                              {allPlaylists?.map(item => {
                                   const cover = item.cover
                                   return (
                                        <div onClick={() => openAlbum(item.id)} key={item.id} className=' w-72 h-[295px] flex flex-col gap-1 bg-secondary/75 rounded border border-border p-1 items-center  '>
                                             <div className='  h-60 bg-green-800 rounded overflow-clip border border-ring/75 flex items-center justify-center'>
                                                  {cover && <>
                                                       <Image
                                                            src={cover.imageUrl}
                                                            alt={item.name}
                                                            width={500}
                                                            height={500}
                                                            draggable={false}

                                                       />


                                                  </>}

                                             </div>
                                             <div className=' w-full p-1'>
                                                  <h1 className=' text-lg text-balance font-semibold'>{item.name}</h1>
                                             </div>

                                        </div>
                                   )
                              })}

                         </div>

                    </main>

               </>}

               <AudioBar2
               setCurrentSong={setCurrentSong}
               currentSong={currentSong}
               mainSong={activeSong}
               PlaylistLength={mainAlbum?.songList.length ? mainAlbum?.songList.length :null}
               
               
               />





          </>
     )
}
