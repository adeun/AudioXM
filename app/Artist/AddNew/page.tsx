import Nav from '@/components/NavVersions/Nav'
import NewSong from '@/components/Song/newSong'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import React from 'react'

export default async function page() {

  const Session = await auth()
  if (!Session) {
    revalidatePath('/')
    redirect('/')

  }
  return (
    <>

      <main className=' flex flex-col gap-2 flex-1'>

        {/* Song list */}

        <NewSong session={Session} />




      </main>
    </>

  )
}
