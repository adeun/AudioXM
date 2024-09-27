"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Slider } from '../ui/slider';
import { Pause, Play, Repeat, Shuffle, StepBack, StepForward } from 'lucide-react';
type AudioList = {
     path: string;
     duration: number;
     name: string;
     id: string;
     author: string[];
}
type props = {
     mainSong: {
          path: string;
          duration: number;
          name: string;
          id: string;

     },
     PlaylistLength: number | null,
     currentSong: number,
     setCurrentSong: React.Dispatch<React.SetStateAction<number>>,
}
export default function AudioBar2({ mainSong, PlaylistLength, currentSong, setCurrentSong }: props) {
     const audioRef = useRef<HTMLAudioElement>(null);
     const [isPlaying, setIsPlaying] = useState(false);
     const maxIconSize = 33
     const iconSizeNmw = Array.from(mainSong.name)
     const [currentTime, setCurrentTime] = useState("0:00");
     const [rawTime, setRawTime] = useState(0)


     const [autoPlay, setAutoPlay] = useState(false);

     const [shuffle, setShuffle] = useState(false);
     const [repeat, setRepeat] = useState(false);

     useEffect(() => {
          if (mainSong.path) {
               if (audioRef.current && isPlaying){
                    const audio = audioRef.current
                    audio.src = mainSong.path;
                    audio.currentTime =rawTime;
                    
               }
               
          }

     }, [mainSong  , isPlaying ])

     /* If this song isplaying The pause button  will show , If this song is not playing the play button Will show */

     function play() { //   ||   = true
          if (audioRef.current) {
               audioRef.current.play();
               setIsPlaying(false);
          }
          if (!autoPlay){
               setAutoPlay(true);
          }
     }
     function pause() { // > By default == false
          if (audioRef.current) {
               audioRef.current.pause();
               setIsPlaying(true);
          }
     }




     function BackButton() {
          if (currentSong > 0) {
               console.log("Backward");

               if (mainSong.path && mainSong.duration) {
                    if (audioRef.current) {
                         const audio = audioRef.current
                         if (audio.currentTime < (audio.duration / 3)) { // If contract is 1/3 of the full length, go to last song

                              setCurrentSong(currentSong - 1);

                         } else {
                              audio.currentTime = 0
                         }

                    } else {
                         console.error("audio ref not found");
                    }
                    setAutoPlay(true);
                    setIsPlaying(true);

               }

          } else if (currentSong === 0) {
               if (audioRef.current) {
                    const audio = audioRef.current
                    audio.currentTime = 0
               }
               setAutoPlay(true);
          }

     }
     function forward() {
          if (PlaylistLength && currentSong === (PlaylistLength)) {
               console.log("End of the list");
               setIsPlaying(false)
               return
          }
          if (PlaylistLength && currentSong < (PlaylistLength)) {
               setCurrentSong(currentSong + 1);
               setIsPlaying(true);
               setAutoPlay(true);
          }

     }
     function PlayButton() {
          setIsPlaying(preData => !preData)


     }
     function onTimeUpdate() {
          if (audioRef.current) {
               const audio = audioRef.current
               const minutes = Math.floor(audio.currentTime / 60); // Calculate minutes
               const seconds = Math.floor(audio.currentTime % 60); // Calculate seconds
               setRawTime(audio.currentTime)
               setCurrentTime(`${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`)


          }
     }
     function fullTime() {
          const minutes = Math.floor(mainSong.duration / 60); // Calculate minutes
          const seconds = Math.floor(mainSong.duration % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`


     }
     // Update The current time based off the users input
     function updataCurrentTime(seconds: number) {
          if (audioRef.current) {
               const audio = audioRef.current
               audio.currentTime = seconds
          }
     }
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



     return (

          <div className=' flex flex-row gap-1 w-[50%] h-[80px]   p-1 '>
               <audio
                    ref={audioRef}
                    
                    onTimeUpdate={onTimeUpdate}
                    autoPlay={autoPlay}
                    onError={() => console.error('Error loading audio file')}
                    onCanPlayThrough={() => console.log('Audio file can play')}
                    onEnded={() => {
                         if (!repeat) {
                              forward()
                         }

                    }}
               />
               {/* song img and name  */}
               <div className=' flex flex-row gap-1'>
                    {/* song Ing */}
                    <div className='flex  w-16 rounded-lg bg-primary/80 p-[2px] overflow-clip items-center justify-center'>
                         <h1 className=' text-primary-foreground/75 text-5xl'>{iconSizeNmw[0]}</h1>
                    </div>
                    {/* Song name  */}
                    <h1></h1>

               </div>

               {/* audio bar Controller */}
               <div className=' flex flex-col flex-1 gap-1 '>
                    {/* the audio slider and time */}
                    <div className=' flex flex-row gap-2  items-center'>
                         {/* Current time */}
                         <p>{currentTime}</p>
                         {/* Audio slider */}
                         <div className=' flex-1'>
                              <Slider
                                   onValueChange={(value) => {
                                        console.log(value);
                                        updataCurrentTime(value[0])
                                   }}
                                   value={[rawTime]}
                                   max={mainSong.duration}
                                   step={0.9}
                              />
                         </div>

                         {/* full Duration */}
                         <p>{fullTime()}</p>
                    </div>

                    {/* play/pause button and Shuffle and repeat */}
                    <div className=' flex flex-row items-center p-1 justify-center'>
                         {/* Shuffle B  */}
                         <div>
                              <div onClick={ShuffleToggle}>
                                   <Shuffle size={maxIconSize} className={` ${shuffle && " text-yellow-500"} hover:text-foreground/75`} />
                              </div>
                         </div>
                         {/* play/pause  , Back and forward B  */}
                         <div className=' flex flex-row flex-1 gap-1  items-center justify-center'>
                              {/* Back button */}
                              <div onClick={BackButton}>
                                   <StepBack size={maxIconSize} className={`  hover:text-foreground/75`} />
                              </div>

                              {/* Play/pause button */}
                              <div onClick={PlayButton}>
                                   {/* If this song is playing, we will see the button this is not */}
                                   {isPlaying ?
                                        <div>
                                             <Pause onClick={() => pause()} className={`  hover:text-foreground/75`} size={maxIconSize} />

                                        </div>
                                        :
                                        <div>
                                             <Play onClick={() => play()} className={`  hover:text-foreground/75`} size={maxIconSize} />

                                        </div>
                                   }
                              </div>

                              {/* forward button */}
                              <div onClick={forward}>
                                   <StepForward size={maxIconSize} className={`  hover:text-foreground/75`} />
                              </div>


                              {/* Repeat B  */}

                         </div>
                         <div>
                              <div onClick={RepeatToggle}>
                                   <Repeat size={maxIconSize} className={` ${repeat && " text-yellow-500"} hover:text-foreground/75`} />
                              </div>
                         </div>

                    </div>

               </div>

          </div>
     )
}
