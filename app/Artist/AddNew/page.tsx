
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import React from 'react'
import AddNewSongPage from '@/components/page/addNewSong'

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

        <AddNewSongPage session={Session} />




      </main>
    </>

  )
}
