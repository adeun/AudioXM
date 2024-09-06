"use client"
import React from 'react'
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './darkMode';
import { User } from 'next-auth';
import { signOut } from '@/server/auth';
type NavProps = {
     user:User
}
export default function Nav({user}:NavProps) {
     async function Logout() {
          await signOut()
         
          
     }
     return (
          <div className=' flex flex-row h-14 border-b-[1.5px]  border-primary' >
               {/* logo */}
               <div className=' flex items-center justify-center overflow-clip'>
                    <div className=''>
                         <StarLogo />
                    </div>

               </div>
               {/* navigation links */}
               <div className=' flex flex-row flex-1'>

               </div>
               {/* user profile dropdown  theme*/}
               <div className=' flex flex-row gap-1 items-center'>
                    <DropdownMenu>
                         <DropdownMenuTrigger>{user.name}</DropdownMenuTrigger>
                         <DropdownMenuContent>
                              <DropdownMenuLabel>My Account</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Profile</DropdownMenuItem>
                              <DropdownMenuItem>Billing</DropdownMenuItem>
                              <DropdownMenuItem>Team</DropdownMenuItem>
                              <DropdownMenuItem>Subscription</DropdownMenuItem>
                              <DropdownMenuItem className='bg-destructive text-destructive-foreground hover:bg-destructive/90' onClick={()=>Logout} >logout</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle/>


               </div>

          </div>
     )
}

const StarLogo = () => {
     return (
          <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 100 100"
               width="200"
               height="200"
          >
               {/* Star */}
               <polygon
                    points="50,15 61,39 88,39 66,57 72,84 50,68 28,84 34,57 12,39 39,39"
                    className="fill-white stroke-black stroke-2"
               />

               {/* Red line going across */}
               <line
                    x1="10"
                    y1="50"
                    x2="90"
                    y2="50"
                    className="stroke-red-500 stroke-[5] bg-primary text-primary-foreground shadow hover:bg-primary/90"
               />
          </svg>
     );
};
