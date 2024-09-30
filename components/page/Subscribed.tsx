"use client"
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import SubscriptionPlan from '@/server/authAction/subscription'
import { LoaderCircle } from 'lucide-react';
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

export default function Subscribed() {
     const router = useRouter()
     const Subscribe = useMutation({
          mutationFn: SubscriptionPlan
     })
     useEffect(() =>{
          if (Subscribe.data?.status){
               
               router.push('/Home')
               window.location.reload()
               
              
          }
          
     },[Subscribe.data])

     
     return (
          <>
           <div className=' flex items-center justify-center'>
                <h1 className=' text-6xl'>Subscribed plans</h1>
           </div>
              

               <main className=' flex-1 flex flex-row gap-20 items-center justify-center'>
                    {/* Student plan */}
                    <div className=' flex flex-col justify-center gap-3 w-[400px] h-72 p-2 items-center bg-foreground/25 rounded-md'>
                         <div className=' flex flex-col p-2 items-center'>
                              <h2>Student Plan</h2>
                              <p>This is the student plan</p>

                         </div>
                         <p>You can listen to 30 songs per month</p>
                         <h1 className=' relative text-3xl'><span className=' text-base text-justify'>$</span>8.99/<span>mo</span></h1>


                         <Button onClick={()=>{Subscribe.mutate({plan:"Student Plan"})}} className=' w-[45%]'>{Subscribe.isPending && <LoaderCircle className=' animate-spin'/>} Subscribe </Button>

                    </div>
                    {/* Premium plan */}
                    <div className=' relative flex flex-col justify-center gap-3 w-[400px] h-72 bottom-10  shadow-custom-pink  p-2 items-center rounded-md bg-pink-700/40'>
                         <div className=' flex flex-col p-2 items-center'>
                              <h2>Premium Plan</h2>
                              <p>This is the premium plan</p>

                         </div>
                         <p>You can listen to unlimited songs</p>
                         <p>Access to premium features</p>
                         <h1 className=' relative text-3xl'><span className=' text-base text-justify'>$</span>14.99/<span>mo</span></h1>


                         <Button onClick={()=>{Subscribe.mutate({plan:"Premium"})}} className=' w-[45%]'>{Subscribe.isPending && <LoaderCircle className=' animate-spin'/>} Subscribe </Button>


                    </div>
                    {/* Professional plan */}
                    <div className=' flex flex-col justify-center gap-3 w-[400px] h-72  p-2 items-center bg-foreground/25 rounded-md'>
                         <div className=' flex flex-col p-2 items-center'>
                              <h2>Professional Plan</h2>
                              <p>This is the professional plan</p>
                         </div>
                         <p>You can listen to unlimited songs</p>
                         <h1 className=' relative text-3xl'><span className=' text-base text-justify'>$</span>9.99/<span>mo</span></h1>

                         <Button onClick={()=>{Subscribe.mutate({plan:"Professional"})}} className=' w-[45%]'>{Subscribe.isPending && <LoaderCircle className=' animate-spin'/>} Subscribe </Button>


                    </div>


               </main>

          </>
     )
}
