
import Nav2 from '@/components/NavVersions/Nav'
import Subscribed from '@/components/page/Subscribed'
import { auth } from '@/server/auth'
import React from 'react'

export default async function page() {
     const Session  = await auth()
     return (
          <> 
          <Nav2 Search={null} user={Session}/>
               <main className=' flex flex-col flex-1'>
                    <Subscribed />

               </main>

          </>
     )
}
