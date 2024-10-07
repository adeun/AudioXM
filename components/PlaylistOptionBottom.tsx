"use client"
import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuGroup,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuPortal,
     DropdownMenuSeparator,
     DropdownMenuShortcut,
     DropdownMenuSub,
     DropdownMenuSubContent,
     DropdownMenuSubTrigger,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddToPlaylist from '@/server/playList/AddToPlaylist'
import { useMutation } from '@tanstack/react-query'
import { Plus } from "lucide-react"
import React from 'react'
type props = {
     clientID: string;
     songID: string;
     userplaylist: {
          id: string;
          name: string;
     }[]
}
export default function PlaylistOptionBottom({ clientID, songID, userplaylist }: props) {
     const playListMutation = useMutation({
          mutationFn: AddToPlaylist
     })
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Plus /></Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel> all playlist</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                         {userplaylist.length > 0 ? (
                              <>
                                   {userplaylist.map(pLayList => (
                                        <DropdownMenuItem
                                             key={pLayList.id}
                                             onClick={() => playListMutation.mutate({ playlistID: pLayList.id, userID: clientID, songID: songID })}
                                        >
                                             Add to :{pLayList.name}
                                        </DropdownMenuItem>
                                   ))}

                              </>
                         ) : (
                              <>
                                   <DropdownMenuItem className=" text-red-600">
                                        Profile
                                   </DropdownMenuItem>
                              </>
                         )}



                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

               </DropdownMenuContent>
          </DropdownMenu>
     )
}


