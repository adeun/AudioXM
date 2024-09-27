
import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/auth'
import DiscoverView from '@/components/page/DiscoverView'
export default async function page() {
  const Session = await auth()
  if (!Session) {
    revalidatePath('/')
    redirect('/')
    
  }
  return (
    
   
    <main className=' flex-1 flex flex-col'>
    
     
          <DiscoverView user={Session}/>
     
     
    </main>
     

  )
}
