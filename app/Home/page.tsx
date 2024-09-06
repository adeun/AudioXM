import AudioView from '@/components/Audio/AudioView'
import Nav from '@/components/Nav'
import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/auth'
export default async function page() {
  const Session = await auth()
  if (!Session) {
    revalidatePath('/')
    redirect('/')
    
  }
  return (
    <>
    <Nav user={Session.user}/>
    <main className=' flex-1 flex flex-row'>
    
     
          <AudioView/>
     
     
    </main>
     
    </>
  )
}
