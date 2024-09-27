import Nav2 from '@/components/NavVersions/Nav'
import PlayListPage from '@/components/page/playListPage'
import { auth } from '@/server/auth'
import FindAlbum from '@/server/songAction/FindAlbum'
import React from 'react'

export default async function page({ params }: { params: { albumId: string } }) {
  const getAlbum = await FindAlbum({ albumId: params.albumId })
  const Session = await auth()

  if (!getAlbum) {
    return (
      <>
        <main className=' flex flex-col gap-2 flex-1 items-center justify-center'>
          <h1>Album Not Found</h1>
          <p>The album you are looking for does not exist.</p>
        </main>
      </>
    )  // Redirect to 404 page or error page if album not found.
  }


  return (
    <>
    <Nav2 Search={null} user={Session}/>
      <main className=' flex flex-col gap-2 flex-1'>
        <PlayListPage album={getAlbum}/>


      </main>
    </>
  )
}
