import AudioView from '@/components/Audio/AudioView'
import Nav from '@/components/NavVersions/Nav'
import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/auth'
import Album from '@/components/View/Album'
export default async function page() {
  const Session = await auth()
  if (!Session) {
    revalidatePath('/')
    redirect('/')
    
  }
  return (
    
   
    <main className=' flex-1 flex flex-col'>
    
     
          <Album user={Session}/>
     
     
    </main>
     

  )
}
