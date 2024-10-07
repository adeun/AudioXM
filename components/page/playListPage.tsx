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
import { useQuery } from '@tanstack/react-query';
import AddNewPlayList from '../addNewPlayList';
import { Session } from 'next-auth';
import PlayListHeader from '../playListHeader';
import UserMadePlayList from '../userMadePlayList';
import PlaylistOptionBottom from '../PlaylistOptionBottom';
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

type userPLayList = {
     id: string;
     name: string;
     songList: {
          id: string;
          name: string;
          audioUrl: string;
          type: string;
          duration: number;
          size: string;
          firebaseId: string;
     }[];
     cover: {
          name: string;
          imageUrl: string;
     } | null;
}


type props = {
     album: (Track | userPLayList),
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
async function fetchPlaylist() { // Fetch the users discovering page
     const response = await fetch('/api/userPlayList');
     if (!response.ok) {
          throw new Error('Failed to fetch albums');
     }
     const data: playlistsResult = await response.json();
     

     return data;
}

export default function PlayListPage({ album, user }: props) {
     const [showPlaylist, setShowPlaylist] = useState(false)
     const { SelectSong, song, currentPlaylistPosition, PlaylistLength, setCurrentPlaylistPosition } = AudioPlayer({ playList: album.songList })
     const { data } = useQuery({
          queryKey: ['fetchPlaylist'], // Unique key for caching and refetching
          queryFn: fetchPlaylist,
     })


     function fullTime(ses: number) {
          const minutes = Math.floor(ses / 60); // Calculate minutes
          const seconds = Math.floor(ses % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`


     }



     return (
          <>
               {showPlaylist && <AddNewPlayList Session={user} setShowPlaylist={setShowPlaylist} />}
               <main className=' grid grid-cols-[6%_94%] flex-1  gap-1 h-full overflow-hidden mt-1 '>
                    {/* user playList */}
                    <UserMadePlayList setShowPlaylist={setShowPlaylist} />

                    {/* Album  */}
                    <main className=' flex flex-col gap-2 w-full h-full overflow-hidden rounded-sm border border-border'>
                         {/* Album header */}
                         <PlayListHeader cover={album.cover?.imageUrl} name={album.name} />

                         {/* Album songs */}

                         <div className=' flex-1 w-full  '>
                              <Table className='w-full '>
                                   <TableCaption>A list of your recent invoices.</TableCaption>
                                   <TableHeader>
                                        <TableRow>
                                             <TableHead className="w-[50px]">#</TableHead>
                                             <TableHead>name</TableHead>

                                             <TableHead className=' text-end'>Duration</TableHead>
                                             <TableHead className=' text-end'>Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {/* Album songs */}
                                        {album.songList.map((song, index) => {
                                             return (
                                                  <TableRow key={song.id} onClick={() => SelectSong(index)}>
                                                       <TableCell>{index + 1}</TableCell>
                                                       {/* The song name and image and artist */}
                                                       <TableCell className=" flex flex-row items-center j gap-1">
                                                            <div className=" rounded-md overflow-clip  w-12 flex items-center justify-center">
                                                                 <ImageLogo size={45} />

                                                            </div>
                                                            <h1>{song.name}</h1>

                                                       </TableCell>

                                                       <TableCell>{fullTime(song.duration)}</TableCell>
                                                       <TableCell className=' flex items-center justify-center'>
                                                            {data && (
                                                                 <>
                                                                 <PlaylistOptionBottom 
                                                                 clientID={user.user.id} 
                                                                 songID={song.id} 
                                                                 userplaylist={
                                                                      data.data.map(item => ({name:item.name , id:item.id}))}
                                                                      />
                                                                 </>
                                                            )}
                                                       </TableCell>
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
