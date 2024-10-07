import Nav2 from '@/components/NavVersions/Nav'
import PlayListPage from '@/components/page/playListPage'
import { auth } from '@/server/auth'
import FindAlbum from '@/server/songAction/FindAlbum'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { House } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import GetUserPlayList from '@/server/playList/getUserPlayList'


interface Props {
  params: { albumId: string };
  searchParams: { [key: string]: string | undefined };
}
type Track = {
  artistList: {
    name: string;
  }[];
  id: string;
  name: string;
  cover: {
    name: string;
    imageUrl: string;
  } | null;
  songList: {
    id: string;
    name: string;
    audioUrl: string;
    type: string;
    duration: number;
    size: string;
    firebaseId: string;
  }[],
}

type userPLayList = {
  id: string;
  name: string;
  cover: {
    name: string;
    imageUrl: string;
  } | null;
  songList: {
    id: string;
    name: string;
    type: string;
    duration: number;
    size: string;
    firebaseId: string;
    audioUrl: string;
  }[];
}

export default async function page({ params, searchParams }: Props) {
  let Album: (Track | userPLayList) | null;

  const Session = await auth()
  const type = searchParams.type;


  if (!Session) {
    revalidatePath('/')
    redirect('/')

  }

  if (type === "Album") {
    Album = await FindAlbum({ albumId: params.albumId })

  } else if (type === "playlist" ) {
    Album = await GetUserPlayList({ userID: Session.user.id, playlistsID: params.albumId })
  } else {
    Album = null
  }


  if (!Album) {
    return (
      <>
        <main className=' flex flex-col gap-2 flex-1 items-center justify-center'>
          <div className=' flex flex-row items-center gap-2'>
            <ShieldAlert className=' text-red-600 text-3xl ' />
            <h2 className=' text-3xl'>  Album Not Found </h2>
            <ShieldAlert className=' text-red-600 text-3xl ' />

          </div>

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
  console.log(Album);
  


  return (
    <>
      <Nav2 Search={null} user={Session} />
      <main className=' flex flex-col gap-2 flex-1'>
        <PlayListPage user={Session} album={Album} />


      </main>
    </>
  )
}
