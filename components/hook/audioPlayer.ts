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
          setActiveSong({
               name: playList[currentPlaylistPosition].name,
               path: playList[currentPlaylistPosition].audioUrl,
               currentTime: 0,
               duration: playList[currentPlaylistPosition].duration,
               id: playList[currentPlaylistPosition].id
          })
     }, [playList, currentPlaylistPosition])

     function SelectSong(id:string) {
          
          // const getSong = playList.filter(item => item.id === id )
          const getIndex = playList.findIndex(item => item.id === id )
          
          
          if( getIndex){
               setCurrentPlaylistPosition(getIndex)
               
          }
          
     }


     return{
          song:activeSong,
          SelectSong:SelectSong,
          PlaylistLength: playList.length -1,
          setCurrentPlaylistPosition,
          currentPlaylistPosition,
     }


}