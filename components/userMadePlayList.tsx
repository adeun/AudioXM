

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'
import {  Plus } from 'lucide-react';
import Link from 'next/link';

type ComponentProps = {
     setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>

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
     console.log(data);

     return data;
}
export default function UserMadePlayList({ setShowPlaylist }: ComponentProps) {
     const userPLayList = useQuery({
          queryKey: ['fetchPlaylist'], // Unique key for caching and refetching
          queryFn: fetchPlaylist,
     });
     return (
          <div className=' h-full w-full flex flex-col   gap-2  p-1 rounded-sm border border-border '>
               <div onClick={() => setShowPlaylist(true)} className=' flex  items-center justify-center w-20 h-20 rounded-md bg-border/50'>
                    <Plus />

               </div>
               {userPLayList.data?.data && userPLayList.data.data.map(pLayList => {
                    const Name = Array.from(pLayList.name)
                    return (
                         <Link key={pLayList.id} href={`/Album/${pLayList.id}?type=playlist`}>
                              <div className=' ml-auto mr-auto relative flex  items-center justify-center w-20 h-20 rounded-md bg-border/50 overflow-clip hover:bg-border/70'>
                                   {pLayList.file ? (<>
                                        <Image
                                             src={pLayList.file.imageUrl}
                                             alt={pLayList.name}
                                             className=' w-full h-full object-cover'
                                             width={900}
                                             height={900} />
                                   </>)
                                        : (<>
                                             <h1>{Name[0]}</h1>
                                        </>)
                                   }
                                   <div className=' absolute w-full h-full hover:bg-border  opacity-30'>

                                   </div>


                              </div>
                         </Link>
                    )
               })}

          </div>
     )
}
