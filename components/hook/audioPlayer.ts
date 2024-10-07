"use client"

import React , { useState , useEffect} from "react"
type client ={
     playList: {
          id: string;
          name: string;
          audioUrl: string;
          type: string;
          duration: number;
          size: string;
          firebaseId: string;
     }[],
}
export function AudioPlayer({playList}:client) {
     const [currentPlaylistPosition , setCurrentPlaylistPosition] = useState(0)
     const [activeSong, setActiveSong] = useState({
          name: "",
          path: "",
          currentTime: 0,
          duration: 0,
          id: ""

     });
     //
     useEffect(() => {
          if (playList.length > 0) {
               setActiveSong({
                    name: playList[currentPlaylistPosition].name,
                    path: playList[currentPlaylistPosition].audioUrl,
                    currentTime: 0,
                    duration: playList[currentPlaylistPosition].duration,
                    id: playList[currentPlaylistPosition].id
               })

          }
        
     }, [playList, currentPlaylistPosition])

     function SelectSong(index:number) {
          console.log({
               playList,
               index,
               currentPlaylistPosition,
          });
          setCurrentPlaylistPosition(index)
          
         
          
     }


     return{
          song:activeSong,
          SelectSong:SelectSong,
          PlaylistLength: playList.length -1,
          setCurrentPlaylistPosition,
          currentPlaylistPosition,
     }


}