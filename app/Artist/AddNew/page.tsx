import Nav from '@/components/Nav'
import NewSong from '@/components/Song/newSong'
import React from 'react'

export default function page() {
  return (
    <>
    <Nav/>
    <main className=' flex flex-col gap-2 flex-1'>

     
      <NewSong/>

    
      
     
     </main>
    </>
    
  )
}
