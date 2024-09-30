import { LoaderCircle } from 'lucide-react';

export default function Loading() {
     // Or a custom loading skeleton component
     return <div className=' flex flex-1 items-center justify-center'>
          <LoaderCircle className='animate-spin' size={58} />
          


     </div>
   }