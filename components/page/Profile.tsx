"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent as TabContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Session } from 'next-auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import GetUser from '@/server/authAction/getUser'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodUpdateForm } from '@/lib/ZOD'
import { useToast } from "@/components/hook/use-toast"
import updateUser from '@/server/authAction/Update'
import { LoaderCircle } from 'lucide-react'
import { Temporal } from "@js-temporal/polyfill";



// Rename your type to avoid conflict with imported TabsContent
type ProfileTabsContent = {
     Session: Session
}
type MyObject = {
     [key: string | "name" | "email" | "password" | "birth" | "PhoneNumber"]: string | number;
};
type user = {
     id: string;
     name: string;
     email: string;
     emailVerified: Date | null;
     image: string | null;
     birth: string;
     phoneNumber: string;
     isAdmin: boolean;
     isArtist: boolean;
     plan: {
          id: string;
          name: string;
          createdAt: Date;
          updatedAt: Date;
          description: string;
          price: number;
          duration: string;
          isFeatured: boolean;
          userID: string;
     } | null;
};

export default function Profile({ Session }: ProfileTabsContent) {
     // Handle query and loading state
     const { data, isLoading, error } = useQuery({
          queryKey: ['user', Session?.user?.id], // Use optional chaining to prevent errors
          queryFn: async () => {
               return await GetUser({ userId: Session?.user?.id });
          },
          enabled: !!Session?.user?.id, // Prevent query if no user ID
     });





     return (
          <>
               <main className='flex-1'>
                    <Tabs defaultValue="Profile" className="w-full h-full">
                         <TabsList>
                              <TabsTrigger className=" font-bold" value="Profile">Profile</TabsTrigger>
                              {Session.user?.isAdmin && <TabsTrigger className="text-lg font-medium"  value="Artist">Artist</TabsTrigger>}
                         </TabsList>
                         <TabContent className=' flex' value="Profile">
                              {data ? <ProfileTab user={data} /> : <div className='flex-1'>Loading...</div>}
                         </TabContent>
                         {Session.user?.isAdmin && (
                              <TabContent className=' flex' value="Artist">
                                   Change your password here.
                              </TabContent>
                         )}
                    </Tabs>
               </main>
          </>
     );
}

// ProfileTab Component
function ProfileTab({ user }: { user: user }) {
     const { toast } = useToast()
     const [info, setInfo] = useState<z.infer<typeof zodUpdateForm>>({});
     const [oldPassword, setOldPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [hidePassword, setHidden] = useState(false);
     const [hidePasswordOld, setHidePasswordOld] = useState(false);
     const [hidePasswordNew, setHidePasswordNew] = useState(false);
     const [hidePasswordConfirm, setHidePasswordConfirm] = useState(false);
     const UpdatedUserMutation = useMutation({
          mutationFn: updateUser,
          onSuccess: (data) => {
               if (data.success) {
                    toast({
                         title: "Success",
                         description: "User updated successfully",
                    })
                    setInfo({});
                    setOldPassword('');
                    setConfirmPassword('');


               }
               if (data.error) {
                    toast({
                         title: "Error",
                         description: data.error,
                    })


               }

          }
     })
     const currentDate = Temporal.Now.plainDateISO()


     function update() {
          // Validate and sanitize the input
          const validatedInfo = zodUpdateForm.safeParse(info);
          if (validatedInfo.error) {
               validatedInfo.error.errors.forEach((error) => {
                    toast({
                         title: `Error at ${error.path[0]}`,
                         description: error.message,
                    })
               })
               return;
          }
          // If there's a password check if the confirm password is a match
          if (validatedInfo.data.password && validatedInfo.data.password !== "") {
               if (validatedInfo.data.password !== confirmPassword) {
                    toast({
                         title: "Error",
                         description: "Passwords do not match",
                    })
                    return;
               }


          }

          if (validatedInfo.data) {
               UpdatedUserMutation.mutate({ userId: user.id, formData: validatedInfo.data, oldPassword: oldPassword })
               console.log(validatedInfo.data);
          }





     }

     return (
          <div className=' flex flex-1 flex-col'>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-5/6 w-4/5 p-4'>
                    <div className=' w-full md:w-auto'>
                         <Label className="text-lg font-medium" htmlFor='name'>name</Label>
                         <Input disabled={UpdatedUserMutation.isPending} id="name" name='name' onChange={(e) => setInfo(preData => ({ ...preData, name: e.target.value }))} placeholder={user.name} value={info.name} />
                    </div>

                    <div className=' w-full md:w-auto'>
                         <Label className="text-lg font-medium" htmlFor='email'>email</Label>
                         <Input disabled={UpdatedUserMutation.isPending} name='email' type="email" id="email" onChange={(e) => setInfo(preData => ({ ...preData, email: e.target.value }))} placeholder={user.email} value={info.email} />
                    </div>

                    <div className=' w-full md:w-auto'>
                         <Label className="text-lg font-medium" htmlFor='birth'>birth</Label>
                         <Input disabled={UpdatedUserMutation.isPending} name='birth' type="date" id="birth" onChange={(e) => setInfo(preData => ({ ...preData, birth: e.target.value }))} placeholder={user.birth} value={info.birth} />
                    </div>

                    <div className=' w-full md:w-auto'>
                         <Label className="text-lg font-medium" htmlFor='phoneNumber'>phone number</Label>
                         <Input disabled={UpdatedUserMutation.isPending} type="tel" name='phoneNumber' id="phoneNumber" onChange={(e) => setInfo(preData => ({ ...preData, PhoneNumber: e.target.value }))} value={info.PhoneNumber} placeholder={user.phoneNumber} />
                    </div>

                    {hidePassword === false ? (
                         <Button className=' w-32 md:w-auto' disabled={UpdatedUserMutation.isPending} onClick={() => setHidden(true)}>New Password</Button>
                    ) : (
                         <>
                              <div className=' w-full md:w-auto'>
                                   <Label className="text-lg font-medium" htmlFor='passwordO'>Old Password</Label>
                                   <div className='flex flex-row gap-1'>
                                        <Input disabled={UpdatedUserMutation.isPending} name='Old Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type={hidePasswordOld ? "text" : "password"} id="passwordO" placeholder="old password" />
                                        <Button onClick={() => setHidePasswordOld(!hidePasswordOld)}>
                                             {hidePasswordOld ? " Hide " : "Show"}
                                        </Button>
                                   </div>
                              </div>


                              <div className=' w-full md:w-auto'>
                                   <Label className="text-lg font-medium" htmlFor='passwordN'>New Password</Label>
                                   <div className='flex flex-row gap-1'>
                                        <Input disabled={UpdatedUserMutation.isPending} name='password' value={info.password} onChange={(e) => setInfo(preData => ({ ...preData, password: e.target.value }))} type={hidePasswordNew ? "text" : "password"} id="passwordN" placeholder="new password" />
                                        <Button onClick={() => setHidePasswordNew(!hidePasswordNew)}>
                                             {hidePasswordNew ? " Hide " : "Show"}
                                        </Button>
                                   </div>
                              </div>

                              <div className=' w-full md:w-auto'>
                                   <Label className="text-lg font-medium" htmlFor='passwordC'> Confirm password</Label>
                                   <div className='flex flex-row gap-1'>
                                        <Input disabled={UpdatedUserMutation.isPending} name='Old Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={hidePasswordConfirm ? "text" : "password"} id="passwordC" placeholder="Confirm password" />
                                        <Button onClick={() => setHidePasswordConfirm(!hidePasswordConfirm)}>
                                             {hidePasswordConfirm ? " Hide " : "Show"}
                                        </Button>
                                   </div>
                              </div>
                         </>
                    )}

                    {/* Artist Section */}
                    <div className='w-full md:w-auto'>
                         {user.isArtist ? (
                              <p>Click the artist tab</p>
                         ) : (
                              <Button>Click to become an artist</Button>
                         )}
                    </div>

                    {user.plan && (
                         <div className='rounded p-2 w-52  flex flex-col gap-1 bg-secondary/75'>
                              <p className="text-lg font-bold">{user.plan.name}</p>
                              <p><span>$</span>{user.plan.price}/mo</p>
                              <p>Ends in {currentDate.until(Temporal.PlainDate.from(user.plan.duration), { largestUnit: "days" }).days.toString()} days</p>
                              <Button variant="destructive">Cancel Subscription</Button>
                         </div>
                    )}

               </div>

               <Button className=" mt-4" disabled={UpdatedUserMutation.isPending} onClick={update}>{UpdatedUserMutation.isPending && <LoaderCircle className='animate-spin' />} update</Button>

          </div>

     );
}

// Empty ArtistTab Component (placeholder for now)
function ArtistTab() {
     return (
          <>
               {/* You can add artist-specific content here */}
          </>
     )
}
