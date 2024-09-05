import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
type props = {
     name: string,
     img: string
     SelectSong: (id: string) => void,
     id: string,
     author: string[]
     songsDuration: number
     index: number



}
export default function AudioListCard({ name, author, id, SelectSong, songsDuration, index }: props) {
     const nameLISY = Array.from(name)
     function timeD() {
          const minutes = Math.floor(songsDuration / 60); // Calculate minutes
          const seconds = Math.floor(songsDuration % 60); // Calculate seconds
          return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`

     }
     return (
          <TableRow className='h-16' key={id} onClick={() => SelectSong(id)}>
               <TableCell className="">{index + 1}</TableCell>
               <TableCell className=' flex flex-row items-center gap-1 '>

                    <div className=' flex h-full w-14 rounded-md bg-primary/45 p-[2px] overflow-clip items-center justify-center'>
                         {/* This is for the image for the audio if no image we will use the tax */}
                         <h1 className=' text-primary-foreground/75 text-5xl'>{nameLISY[0]}</h1>

                    </div>
                    <h1 className=''>{nameLISY.length > 27 ? `${nameLISY.slice(0, 27).join("")}...` : `${name}`}</h1>

               </TableCell>


               <TableCell>
                    <div  className=' flex flex-row gap-2' onClick={(e) =>{ e.stopPropagation}} >
                    {
                    author.map(author =>{
                         return  (<Link href={`Artist/${author}`} key = {author} >
                              <h1 onClick={(e) =>{e.stopPropagation}} className=' text-primary underline-offset-4 hover:underline'>{author}</h1>
                         </Link>)
                    })
               }

                    </div>
                   
               </TableCell>
               <TableCell className="text-right">{timeD()}</TableCell>
          </TableRow>
     )
}
