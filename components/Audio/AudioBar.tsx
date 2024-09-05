"use client"
import React, { useState, useEffect, useRef } from 'react'

import { Pause, Play, Repeat, Shuffle, StepBack, StepForward } from 'lucide-react'
import { Slider } from '../ui/slider'
type AudioList = {
     path: string;
     duration: number;
     name: string;
     id: string;
     author: string[];
}
type props = {
    
     currentSong: number,
     setCurrentSong: React.Dispatch<React.SetStateAction<number>>,
     listSongs: [] | AudioList[]
     songs: {
          name: string;
          path: string;
          currentTime: number;
          duration: number;
     }
     setSongs: React.Dispatch<React.SetStateAction<{
          name: string;
          path: string;
          currentTime: number;
          duration: number;
     }>>
     setPlaySong: React.Dispatch<React.SetStateAction<boolean>>
     playSong: boolean

    






}
export default function AudioBar({  songs , currentSong , setCurrentSong ,listSongs ,setSongs ,setPlaySong ,playSong }: props) {
     const audioRef = useRef<HTMLAudioElement>(null);
     const [autoPlay, setAutoPlay] = useState(false);
     
     const [shuffle, setShuffle] = useState(false);
     const [repeat, setRepeat] = useState(false);

     const maxIconSize = 33
     const iconSizeNmw = Array.from(songs.name)
     // Pause the song by using a boolean As the trigger to activate the use of effect and also pause the current audio file
     useEffect(() => {

          if (currentSong === 0 && listSongs.length > 0 && !songs.path || !songs) {
               console.log("test");
               const FirstSong = listSongs[0]
               setSongs(preData => ({ ...preData, ...preData, path: FirstSong.path, duration: FirstSong.duration, name: FirstSong.name }))


          }

          function play() {
               if (audioRef.current) {
                    if (playSong) {
                         audioRef.current.play();
                    } else {
                         audioRef.current.pause();
                    }
               }
          }
          play();

     }, [playSong, listSongs, songs, currentSong])
     // Shuffle future has not been implemented
     function ShuffleToggle() {
          setShuffle(!shuffle);
          setRepeat(false)
     }
     // Repeat future has not been implemented
     function RepeatToggle() {
          setRepeat(!repeat);
          setShuffle(false)
     }
     // Update the time of the current audio file 
     function TimeUpdate() {
          if (audioRef.current) {
               const audio = audioRef.current
               setSongs(preData => ({ ...preData, currentTime: audio.currentTime }))

          }
     }
     // Update The current time based off the users input
     function NewTimePoint(sce: number) {
          if (audioRef.current) {
               audioRef.current.currentTime = sce;
          }
     }
     // Update the current audio file based on the users selection
     function PlayAudio() {
          setPlaySong(!playSong);


     }
     function endingTime() {
          const minutes = Math.floor(songs.duration / 60); // Calculate minutes
          const seconds = Math.floor(songs.duration % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`

     }
     function startingTime() {
          const minutes = Math.floor(songs.currentTime / 60); // Calculate minutes
          const seconds = Math.floor(songs.currentTime % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`
     }
     function Forward() {
          if (currentSong === (listSongs.length - 1)) {
               console.log("End of the list");
               setCurrentSong(0);
               setPlaySong(false)
               return
          }
          if (currentSong < (listSongs.length - 1)) {
               setCurrentSong(currentSong + 1);
          }

     }
     // Go to the previous song I'm having ability to start from the beginning of the song if the song is a third away
     function Backward() {
          if (currentSong > 0) {
               console.log("Backward");

               if (songs.path && songs.duration) {
                    if (audioRef.current) {
                         const audio = audioRef.current
                         if (audio.currentTime < (audio.duration / 3)) {

                              setCurrentSong(currentSong - 1);

                         } else {
                              audio.currentTime = 0
                         }

                    } else {
                         console.log("audio ref not found");
                    }

               }

          } else if (currentSong === 0) {
               if (audioRef.current) {
                    const audio = audioRef.current
                    audio.currentTime = 0
               }
          }

     }
     console.log();
     
     return (
          <>
               <audio
                    className=' hidden'
                    ref={audioRef}
                    autoPlay={autoPlay}

                    onTimeUpdate={TimeUpdate}
                    onError={() => console.error('Error loading audio file')}
                    onCanPlayThrough={() => console.log('Audio file can play')}
                    onEnded={() => {
                         if (!repeat) {
                              Forward()
                         }

                    }}

                    src={songs.path}

               />
               <div className=' flex flex-row w-[65%]   bg-primary/15 text-primary-foreground rounded-sm gap-3 p-1'>
                    <div className=' flex flex-row gap-1 items-center justify-center'>
                         <div className=' flex h-full w-16 rounded-lg bg-primary/80 p-[2px] overflow-clip items-center justify-center'>
                              {/* This is for the image for the audio if no image we will use the tax */}
                              <h1 className=' text-primary-foreground/75 text-5xl'>{iconSizeNmw[0]}</h1>

                         </div>


                    </div>
                    <div className=' flex flex-col flex-1 gap-1'>
                         <div className='flex flex-row gap-2 items-center justify-center'>
                              <h3>{startingTime()}</h3>
                              <Slider
                                   onValueChange={(event) => {
                                        
                                        NewTimePoint(event[0])
                                   }}
                                   value={[songs.currentTime]}
                                   max={songs.duration}
                                   step={0.9}
                              />
                              <h3>{endingTime()}</h3>

                         </div>
                         <div className='flex flex-row'>
                              <div className=' flex flex-row gap-1'>
                                   <div onClick={ShuffleToggle}>
                                        <Shuffle size={maxIconSize} className={` ${shuffle && " text-yellow-500"} hover:text-foreground/75`} />
                                   </div>


                              </div>


                              <div className=' flex-1 flex flex-row gap-4 items-center justify-center'>


                                   <div onClick={Backward}>
                                        <StepBack size={maxIconSize} className={`  hover:text-foreground/75`} />
                                   </div>

                                   <div onClick={PlayAudio}>
                                        {playSong ?
                                             <Play className={`  hover:text-foreground/75`} size={maxIconSize} />
                                             :
                                             <Pause className={`  hover:text-foreground/75`} size={maxIconSize} />}
                                   </div>

                                   <div onClick={Forward}>
                                        <StepForward size={maxIconSize} className={`  hover:text-foreground/75`} />
                                   </div>


                              </div>

                              <div className='flex flex-row gap-1'>
                                   <div onClick={RepeatToggle}>
                                        <Repeat size={maxIconSize} className={` ${repeat && " text-yellow-500"} hover:text-foreground/75`} />
                                   </div>

                              </div>
                         </div>

                    </div>



               </div>
          </>

     )
}

