"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import Nav2 from '../NavVersions/Nav';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth'
import { Plus } from 'lucide-react';
import AddNewPlayList from '../addNewPlayList';
import UserMadePlayList from '../userMadePlayList';

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
type Component = {
     user: Session
}
type playlistsResult = {
     data: {
          id: string;
          name: string;
          file: {
               id: string;
               name: string;
               imageUrl: string;
          } | null;
     }[]
}


async function fetchAlbums() { // Fetch the users discovering page
     const response = await fetch('/api/discover');
     if (!response.ok) {
          throw new Error('Failed to fetch albums');
     }
     const data: AAA = await response.json();
     return data;
}
export default function DiscoverView({ user }: Component) {
     // search system for the navigation
     const [search, setSearch] = useState('')
     const [showPlaylist, setShowPlaylist] = useState(false)
     const [playlistsResult, setPlaylistsResult] = useState<AAA>([])
     const {
          data: allPlaylists,
          isLoading,
          error,
     } = useQuery({
          queryKey: ['allPlaylists'], // Unique key for caching and refetching
          queryFn: fetchAlbums,
     });
     
     useEffect(() => {
          if (allPlaylists) {
               setPlaylistsResult(allPlaylists)
          }

     }, [allPlaylists])
     return (
          <>
               {showPlaylist && <AddNewPlayList Session={user} setShowPlaylist={setShowPlaylist} />}
               <Nav2 user={user} Search={{ searchValue: search, setSearchValue: setSearch }} />
               <main className='grid grid-cols-[6%_94%] flex-1  gap-1'>
                    {/* user playList */}
                    <UserMadePlayList setShowPlaylist={setShowPlaylist}/>

                    {/*  */}
                    <main className=' flex flex-col gap-2 w-full h-full  rounded-sm border border-border'>
                         <div className={`flex flex-row ${isLoading && " items-center justify-center"} overflow-y-scroll gap-3 p-2 h-80`}>

                              {isLoading ?
                                   <>
                                        <div className=' flex flex-row gap-1 items-center justify-center p-2 '>
                                             <Plus size={45} className=' animate-spin text-amber-300/40' />
                                             <Plus size={60} className=' animate-spin text-amber-300' />
                                             <Plus size={45} className=' animate-spin text-amber-300/40' />

                                        </div>
                                   </>
                                   :
                                   <>
                                        {playlistsResult?.map(item => {
                                             const cover = item.cover
                                             return (
                                                  <Link key={item.id} href={`/Album/${item.id}?type=Album`}>
                                                       <div className=' w-72 h-[295px] flex flex-col gap-1 bg-secondary/75 rounded border border-border p-1 items-center  '>
                                                            <div className='  h-60 bg-green-800 rounded overflow-clip border border-ring/75 flex items-center justify-center'>
                                                                 {cover && <>
                                                                      <Image
                                                                           src={cover.imageUrl}
                                                                           alt={item.name}
                                                                           width={1000}
                                                                           height={1000}
                                                                           draggable={false}

                                                                      />


                                                                 </>}

                                                            </div>
                                                            <div className=' w-full p-1'>
                                                                 <h1 className=' text-lg text-balance font-semibold'>{item.name}</h1>
                                                            </div>

                                                       </div>
                                                  </Link>

                                             )
                                        })}

                                   </>}


                         </div>

                    </main>


               </main>
          </>

     )
}
