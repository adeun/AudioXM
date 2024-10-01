import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/auth'
import Nav2 from '@/components/NavVersions/Nav'
import Profile from '@/components/page/Profile'

export default async function page() {
     const Session = await auth()

  if (!Session) {
    revalidatePath('/')
    redirect('/')
    
  }
  
  return (
    <>
    <Nav2 Search={null} user={Session}/>
    <main className='flex flex-1'>
     <Profile Session={Session}/>

    </main>
     
    </>
  )
}
