

"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from '../darkMode';
import { Session, User } from 'next-auth';
import LogOut from '@/server/authAction/LogOut';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Label } from '../ui/label';
type Props = {
     user: Session,
     Search: {
          searchValue: string;
          setSearchValue: React.Dispatch<React.SetStateAction<string>>
     } | null,

}
export default function Nav2({ user, Search }: Props) {
     const [hideLabe, setHideLabe] = useState(true);
     const LogoutM = useMutation({
          mutationFn: LogOut
     })
     return (
          <div className=' flex flex-row  h-16 border-b-[1.5px]  border-primary'>
               {/* logo div  */}
               <div className='flex flex-row justify-center items-center object-fill'>
                    <ModernLogo />

               </div>
               {/* navigation links  and input  */}
               <div className=' flex flex-row justify-center items-center flex-1'>

                    {Search && (
                         <div className=' p-1'>
                           
                              <Input
                                   value={Search.searchValue}
                                   onChange={(e) => Search.setSearchValue(e.target.value)}
                                   id='Search'
                                   onBlur={() => {

                                   }}
                                   onFocus={() => {

                                   }}
                                   className=' w-[285px] '
                                   placeholder='Search'

                              />

                         </div>
                    )}


               </div>
               {/* user profile dropdown  and  dark mode  */}
               <div className='flex flex-row gap-2 items-center justify-center'>
                    <DropdownMenu>
                         <DropdownMenuTrigger>{user.user.name}</DropdownMenuTrigger>
                         <DropdownMenuContent>
                              <DropdownMenuLabel>My Account</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Profile</DropdownMenuItem>
                              <DropdownMenuItem>Billing</DropdownMenuItem>
                              <DropdownMenuItem>Team</DropdownMenuItem>
                              <DropdownMenuItem>Subscription</DropdownMenuItem>
                              <DropdownMenuItem className='bg-destructive text-destructive-foreground hover:bg-destructive/90' onClick={() => LogoutM.mutate()} > {LogoutM.isPending && <LoaderCircle className=' animate-spin' />} logout</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />



               </div>

          </div>
     )
}
const ModernLogo = () => {
     return (
          <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 100 100"
               width="60"
               height="60"
          >
               {/* Outer Circle */}
               <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#333"
                    strokeWidth="4"
                    fill="none"
               />

               {/* Inner square rotated 45 degrees */}
               <rect
                    x="30"
                    y="30"
                    width="40"
                    height="40"
                    fill="#4CAF50"
                    transform="rotate(45 50 50)"
               />

               {/* Vertical Line */}
               <line
                    x1="50"
                    y1="20"
                    x2="50"
                    y2="80"
                    stroke="#333"
                    strokeWidth="4"
               />

               {/* Horizontal Line */}
               <line
                    x1="20"
                    y1="50"
                    x2="80"
                    y2="50"
                    stroke="#333"
                    strokeWidth="4"
               />
          </svg>
     );
};