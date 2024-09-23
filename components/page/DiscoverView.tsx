import Image from 'next/image';
import React from 'react'
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
type props = {
     allPlaylists: AAA |undefined ,
     openAlbum: (id: string) => void,
}

export default function DiscoverView({ allPlaylists , openAlbum}:props) {
  return (
     <main className='grid grid-cols-[6%_94%] flex-1 '>
    
     {/*  */}
     <div className=' flex flex-row gap-3 p-2 h-80'>
          {allPlaylists?.map(item => {
               const cover = item.cover
               return (
                    <div onClick={() => openAlbum(item.id)} key={item.id} className=' w-72 h-[295px] flex flex-col gap-1 bg-secondary/75 rounded border border-border p-1 items-center  '>
                         <div className='  h-60 bg-green-800 rounded overflow-clip border border-ring/75 flex items-center justify-center'>
                              {cover && <>
                                   <Image
                                        src={cover.imageUrl}
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                        draggable={false}

                                   />


                              </>}

                         </div>
                         <div className=' w-full p-1'>
                              <h1 className=' text-lg text-balance font-semibold'>{item.name}</h1>
                         </div>

                    </div>
               )
          })}

     </div>

</main>
  )
}
