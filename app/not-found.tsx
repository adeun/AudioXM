import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { House } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import { headers } from 'next/headers'
export default async function NotFound() {
     const headersList = headers()
     const domain = headersList.get('host')
     console.log(`Domain: ${domain}`)

     return (
          <div className=' flex flex-row flex-1 items-center justify-center'>
<div className='flex-col gap-1'>
            <ShieldAlert className=' text-red-600 text-3xl ' />
            <h2 className=' text-3xl'>  Album Not Found </h2>
            <ShieldAlert className=' text-red-600 text-3xl ' />

          </div>
               <p className=' text-lg'>Could not find requested resource</p>

               <Link className=' text-xl' href="/Home">
                    <Button> <House /> Return Home</Button>
               </Link>


          </div>
     )
}