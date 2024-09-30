import Nav2 from '@/components/NavVersions/Nav'
import PlayListPage from '@/components/page/playListPage'
import { auth } from '@/server/auth'
import FindAlbum from '@/server/songAction/FindAlbum'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { House } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
export default async function page({ params }: { params: { albumId: string } }) {
  const getAlbum = await FindAlbum({ albumId: params.albumId })
  const Session = await auth()

  if (!getAlbum) {
    return (
      <>
        <main className=' flex flex-col gap-2 flex-1 items-center justify-center'>
          
          <h2 className=' text-3xl'> <ShieldAlert className=' text-red-600 flex-col gap-1' /> Album Not Found <ShieldAlert className=' text-red-600' /></h2>
          <p className=' text-lg'>The album you are looking for does not exist.</p>

          <Link className=' text-xl' href="/Home">
            <Button>
              <House />   Return Home
            </Button>
          </Link>
        </main>
      </>
    )  // Redirect to 404 page or error page if album not found.
  }


  return (
    <>
      <Nav2 Search={null} user={Session} />
      <main className=' flex flex-col gap-2 flex-1'>
        <PlayListPage album={getAlbum} />


      </main>
    </>
  )
}
