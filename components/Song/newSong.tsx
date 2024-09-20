"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FileDetails, ToAudioDetails } from '@/lib/type'
import { ImageOff, LoaderCircle } from 'lucide-react';

import { toAudioAsBase64, toAudioAsBase64Z, toFileAsBase64 } from '@/lib/Bass64'
import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import AudioBar2 from '../Audio/AudioBar2'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import { z } from 'zod'
import { AlbumUploadForm } from '@/lib/ZOD'
import { useMutation } from '@tanstack/react-query'
import AddSong from '@/server/songAction/addSong'
import { Session } from 'next-auth'




export default function NewSong({session}:{session:Session}) {
     const [isMounted, setIsMounted] = useState(false);

     const { toast } = useToast()
     const newAlbumMutation = useMutation({
          mutationFn: AddSong
     })

     const AidioFileRef = useRef<HTMLInputElement | null>(null)
     const [songForm, setSongForm] = useState<z.infer<typeof AlbumUploadForm>>({
          name: "",
          artist: [],
          cover: null,
          release_date: "",
          songs: [],
     })
     const [currentSong, setCurrentSong] = useState(0)
     const [mainSong, setMainSong] = useState({
          path: "",
          duration: 0,
          name: "",
          id: "",
     })

     const [artist, setArtist] = useState("")
     const [fileLog, setFileLog] = useState<ToAudioDetails | null>(null)
     // check if everything is mounted first
     useEffect(() => {
          // Simulate async task (e.g., fetching data, waiting for all components to mount)
          const timer = setTimeout(() => {
               setIsMounted(true);
          }, 300); // Adjust time if needed

          return () => clearTimeout(timer);
     }, []);


     if (!isMounted) {
          return <div className=' flex-1 flex items-center justify-center'>
               <LoaderCircle className=' animate-spin' size={78} />
          </div>;
     }

    




     function SelectAudio(id: string) {
          const SA = songForm.songs.filter(song => song.id === id)
          setMainSong({
               path: SA[0].path,
               duration: SA[0].duration,
               name: SA[0].name,
               id: SA[0].id,
          })
     }

     function addNewArtist() {
          if (artist) {
               if (!songForm.artist.includes(artist)) {
                    setSongForm(preData => ({ ...preData, artist: [...preData.artist, artist] }))

               } else {
                    toast({
                         title: "Error ",
                         variant: "destructive",
                         description: "Artist already exists",
                    })
               }

          } else {
               toast({
                    title: "Error ",
                    variant: "destructive",
                    description: "please enter a artist",
               })

          }
          setArtist("")


     }
     function addSong(S: ToAudioDetails) {
          setSongForm(preData => ({ ...preData, songs: [...preData.songs, S] }))

     }
     function songDele(id: string) {
          setSongForm(preData => {
               return {
                    ...preData,
                    songs: preData.songs.filter((song) => song.id !== id)
               }
          })
     }
     function UpdateSongName(id: string, name: string) {
          // Update the song name
          setSongForm((preData) => {
               return {
                    ...preData,
                    songs: preData.songs.map((song) => {
                         if (song.id === id) {
                              song.name = name
                         }
                         return song
                    })
               }
          })


     }
     function sendEND() {
          if (AidioFileRef.current) {
               const formData = AidioFileRef.current
               if (formData.files) {
                    const A = Array.from(formData.files)
                    console.log(A);
               }
               console.log("value", formData.value);
          }


     }
     async function AudioFileHandle(e: React.ChangeEvent<HTMLInputElement>) {
          const file = e.target.files
          console.log("file");

          try {


               if (file) {
                    const files = Array.from(file)
                    console.log(files.length <= 5);


                    if ((files.length <= 5)) {
                         console.log("file start");

                         const newfile = await toAudioAsBase64(files[0])
                         setFileLog(newfile)

                         console.log(newfile);


                    } else {
                         console.error("Only 1 Audio  allowed")

                    }


               }

          } catch (error) {
               console.error("Error converting file:", error);


          }


     }
     async function ImgFileHandle(e: React.ChangeEvent<HTMLInputElement>) {
          const fileImg = e.target.files
          console.log("file");

          if (fileImg) {
               const files = Array.from(fileImg)


               if ((files.length === 1)) {
                    const newfile = await toFileAsBase64(files[0])
                    setSongForm(preData => ({ ...preData, cover: newfile }))


               } else {
                    console.error("Only 1 Audio  allowed")
                    return
               }


          }

     }
     function UploadAudio() {
          console.log("uploadAudio");
          console.log("fileLog ==== ", fileLog);

          if (fileLog) {
               setSongForm(preData => {
                    let newSongs = new Set(preData.songs)
                    newSongs.add({ ...fileLog })
                    return { ...preData, songs: [...Array.from(newSongs)] }
               })

               if (AidioFileRef.current) {
                    AidioFileRef.current.value = ''
                    setFileLog(null)

               }

          } else {
               console.error("Please select audio file")
          }

     }
     function endingTime(duration: number) {
          const minutes = Math.floor(duration / 60); // Calculate minutes
          const seconds = Math.floor(duration % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`

     }
     // ! Uploading the album to the server to be uploaded to to the database
     function UploadAlbum() {
          const albumState = AlbumUploadForm.safeParse(songForm)
          const albumStateError = albumState.error?.errors
          if (albumStateError) {
               albumStateError.forEach(err => {
                    toast({
                         title: ` Error at ${err.path[0]}`,
                         description: err.message,
                    })
               })
               return
          } else {
               const albumStateData = albumState.data;
               if (albumStateData) {
                    newAlbumMutation.mutate({data: albumStateData , userId:session.user.id})

                    setSongForm({
                         name: "",
                         artist: [],
                         cover: null,
                         release_date: "",
                         songs: [],
                    })
                    setMainSong({
                         path: "",
                         duration: 0,
                         name: "",
                         id: "",

                    })

                    toast({
                         title: "Album uploaded successfully",
                         description: "Your album has been uploaded successfully",
                         variant: "default",
                    })

               }
          }

     }




     return (
          <>



               <div className=' flex flex-col gap-1'>
                    <div className=' flex flex-row gap-2 p-1 '>
                         {/* row 1 */}
                         <div className=' flex flex-col gap-2'>
                              <div className=' w-[350px]'>
                                   <Label htmlFor='name'> Name</Label>
                                   <Input id='name' value={songForm.name} onChange={(e) => setSongForm(predata => ({ ...predata, name: e.target.value }))} type="text" />
                              </div>

                              {/* This is the songs artist featured */}
                              <div className=' flex flex-col gap-1  w-[350px]'>
                                   <div className=' flex flex-row gap-1'>

                                        <div className=' w-[300px]'>
                                             <Label htmlFor='artist'> artist</Label>
                                             <Input id='artist' type="text" value={artist} onChange={(e => { setArtist(e.target.value) })} />
                                        </div>

                                        <div className=' flex items-end'>
                                             <Button onClick={addNewArtist}>ADD</Button>
                                        </div>


                                   </div>

                                   <div className=' flex flex-row gap-1 p-1 flex-grow flex-wrap border border-input min-h-16 max-h-32 rounded-md  overflow-y-scroll'>
                                        {songForm.artist.map((songArtist, index) => {
                                             return (
                                                  <div key={songArtist + index} className=' bg-primary/85 rounded p-1 h-8 '>
                                                       <h2>{songArtist}</h2>
                                                  </div>
                                             )
                                        })}
                                   </div>


                              </div>


                              {/* Audio input */}
                              <div className=' flex flex-col gap-1 rounded-b-sm   w-[350px]' >
                                   <div className=' flex flex-row gap-1'>

                                        <div className=' w-[300px]'>
                                             <Label htmlFor='AudioInputs'> Add Audio</Label>
                                             <Input
                                                  ref={AidioFileRef}

                                                  id='AudioInputs'
                                                  type="file"
                                                  accept="audio/mpeg3"
                                                  onChange={(e) => AudioFileHandle(e)} />
                                        </div>

                                        <div className=' flex items-end'>
                                             <Button onClick={UploadAudio}>ADD</Button>
                                        </div>


                                   </div>

                              </div>

                         </div>

                         {/* row 2 */}
                         <div>
                              <div className=' w-[350px]'>
                                   <Label htmlFor='release_date'> release date</Label>
                                   <Input id='release_date' value={songForm.release_date} type="date" onChange={(e) => setSongForm(predata => ({ ...predata, release_date: e.target.value }))} />
                              </div>

                              {/* This is the image for for the songs cover */}
                              <div className=' flex flex-col items-center gap-1  w-[350px] '>
                                   <div>
                                        <Label htmlFor='cover'> cover</Label>
                                        <Input
                                             id='cover'
                                             type="file"
                                             accept="image/*"
                                             onChange={(e) => ImgFileHandle(e)}

                                        />

                                   </div>
                                   <div className='border border-input rounded w-[300px] h-60 flex items-center justify-center'>
                                        {songForm.cover ?
                                             (<Image
                                                  width={900}
                                                  height={900}
                                                  src={songForm.cover.path}
                                                  alt='cc'
                                                  className='object-contain w-full h-full'
                                             />
                                             )
                                             :
                                             (<ImageOff
                                                  className=' text-border'
                                                  size={60}
                                             />
                                             )
                                        }

                                   </div>


                              </div>



                         </div>

                    </div>


                    <Button disabled ={newAlbumMutation.isPending} className=' w-80' onClick={UploadAlbum}>{newAlbumMutation.isPending &&<LoaderCircle className ="animate-spin" />} Upload album</Button>
               </div>



               {/* End */}
               {/* Table of songs */}
               <div className=' flex flex-row flex-grow flex-wrap  border border-input'>


                    <Table>
                         <TableCaption>A list of your recent invoices.</TableCaption>
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="w-[50px]">#</TableHead>
                                   <TableHead>Edit name</TableHead>

                                   <TableHead>size</TableHead>
                                   <TableHead>duration</TableHead>
                                   <TableHead >Actions</TableHead>

                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {songForm.songs.map((songA, index) => {
                                   return (
                                        <TableRow onClick={() => SelectAudio(songA.id)} key={songA.id}>
                                             <TableCell className="font-medium">{index + 1}</TableCell>
                                             <TableCell>
                                                  <Input id='nameS' type="text" value={songA.name} onChange={(e) => UpdateSongName(songA.id, e.target.value)} />
                                             </TableCell>

                                             <TableCell>{songA.size}</TableCell>
                                             <TableCell>{endingTime(songA.duration)}</TableCell>
                                             <TableCell >
                                                  <Button variant={"destructive"} onClick={() => songDele(songA.id)}>Delete</Button>
                                             </TableCell>


                                        </TableRow>
                                   )
                              })}

                         </TableBody>
                    </Table>

               </div>
               <AudioBar2
                    mainSong={mainSong}
                    PlaylistLength={songForm.songs?.length ? songForm.songs?.length  : null}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
               />




          </>
     )
}
