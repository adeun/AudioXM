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
import Nav2 from '../NavVersions/Nav';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import DiscoverRouteV from '@/server/songAction/discoverInfo';
import GetAlbumAll from '@/server/songAction/getAlbumAll';
import FindAlbum from '@/server/songAction/FindAlbum';
import AudioBar2 from "../Audio/AudioBar2";
import PlayListPage from "./playListPage";
import DiscoverView from "./DiscoverView";
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
export default function RootPage({ user }: Component) {
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
               if (playlist) {
                    setActiveSong({
                         name: playlist[currentSong].name,
                         path: playlist[currentSong].audioUrl,
                         currentTime: 0,
                         duration: playlist[currentSong].duration,
                         id: playlist[currentSong].id
                    })
               }
          }
     }, [currentSong, mainAlbum])




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
               <main className="grid grid-cols-[6%_94%] flex-1">
                    {/* <aside className="hidden sm:block w-[25%] h-full overflow-y-scroll">
                       
                    </aside> */}
                    {/* user playList */}
                    <div className="flex flex-col gap-3 p-2 h-full">

                    </div>
                    {activeView === "AlbumView" && mainAlbum &&
                         <PlayListPage album={mainAlbum} SelectSong={SelectSong} />
                    }

                    {activeView === "DiscoverView" && <DiscoverView allPlaylists={allPlaylists} openAlbum={openAlbum} />}


               </main>

               <AudioBar2
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    mainSong={activeSong}
                    PlaylistLength={mainAlbum?.songList.length ? mainAlbum?.songList.length : null}


               />





          </>
     )
}
