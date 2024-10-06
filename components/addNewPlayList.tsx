"use client"

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FileDetails } from '@/lib/type'
import { toFileAsBase64 } from '@/lib/Bass64'
import { Button } from './ui/button'
import Image from 'next/image'
import { useToast } from './hook/use-toast'
import { Session } from 'next-auth'
import { useMutation ,useQueryClient } from '@tanstack/react-query'
import AddPlayList from '@/server/playList/AddPlayList'
import { LoaderCircle } from 'lucide-react'

type props = {
     setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>,
     Session:Session
}
export default function AddNewPlayList({ setShowPlaylist ,Session }: props) {
     const queryClient = useQueryClient();

     const { toast } = useToast()
     const [info, setInfo] = useState<{ name: string, ImageFile: FileDetails | null }>({
          name: '',
          ImageFile: null
     })
     const AddProfileMutation = useMutation({
          mutationFn: AddPlayList,
          onSuccess: () => {
               toast({
                    title: "Success ",
                    description: "Playlist added successfully"
               })
               setShowPlaylist(false)
               setInfo({ name: '', ImageFile: null })
               queryClient.invalidateQueries({queryKey:["fetchPlaylist"]});
          }
     })
     async function fileX(e: React.ChangeEvent<HTMLInputElement>) {
          const file = e.target.files
          if (file && file[0] && file.length === 1) {
               const fileObject = await toFileAsBase64(file[0])
               setInfo(pre => ({ ...pre, ImageFile: fileObject }))

          }
     }
     console.log(info);
     function addNewPlayList() {
          if (!info.name) {
               toast({
                    title: "Error ",
                    description: "Playlist name is required"
               })
               return;

          }
          AddProfileMutation.mutate({info:{name: info.name ,file: info.ImageFile} ,uaserID:Session.user.id})
          
     }


     return (
          <div onClick={() => setShowPlaylist(false)} className=' z-[1000] absolute min-h-screen min-w-full backdrop-blur-xl bg-fuchsia-300/10 flex items-center justify-center'>
               <div onClick={(e) => { e.stopPropagation() }} className=" bg-card flex flex-col items-center justify-center h-[440px] w-[475px] rounded-lg shadow-lg p-6 "  >
                    <label htmlFor='int' className="flex items-center justify-center border border-dashed h-60 w-72 cursor-pointer rounded-md overflow-hidden" >
                         <Input  disabled={AddProfileMutation.isPending} id='int' type="file" accept="image/*" className=' hidden w-full h-full ' onChange={(e) => fileX(e)} />
                         {info.ImageFile ?
                              (<Image className="h-full w-full object-cover" width={900} height={900} alt={info.ImageFile.name} src={info.ImageFile.path} />)
                              :
                              (<h1 className='text-lg font-semibold text-gray-500'>Add playlist image</h1>)}
                    </label>
                    <div className='mt-4 w-full'>
                         <Label className="block text-sm font-medium text-gray-700">Name</Label>
                         <Input disabled={AddProfileMutation.isPending} onClick={(e) => { e.preventDefault(); }} value={info.name} onChange={(e) => setInfo(pre => ({ ...pre, name: e.target.value }))} />
                    </div>
                    <Button className='mt-4'  disabled={AddProfileMutation.isPending} onClick={(e) => { e.preventDefault(); addNewPlayList() }}>{AddProfileMutation.isPending &&<LoaderCircle className ="animate-spin" />}add</Button>


               </div>

          </div>
     )
}



