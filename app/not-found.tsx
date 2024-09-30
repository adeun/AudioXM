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
          <div className=' flex flex-1 items-center justify-center'>
               <h2 className=' text-3xl'>
                    <ShieldAlert className=' text-red-600' />

                     Not Found 

                    <ShieldAlert className=' text-red-600' />
               </h2>
               <p className=' text-lg'>Could not find requested resource</p>

               <Link className=' text-xl' href="/Home">
                    <Button>
                         <House />   Return Home
                    </Button>
               </Link>


          </div>
     )
}