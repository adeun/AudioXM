"use server";

import prisma from "../db";

export default async function GetUser({userId}:{userId:string}) {
     try {
          const user = await prisma.user.findFirst({
               where: {
                    id: userId
               },
               include:{
                    plan: true,
               }
              
          })
          if (!user) return null;
          
          return {
               name: user.name,
               email: user.email,
               id: user.id,
               plan: user.plan,
               isArtist: user.isArtist,
               birth: user.birth,
               phoneNumber: user.PhoneNumber.toString(), // Convert to string
               image: user.image,
               emailVerified: user.emailVerified,
               isAdmin: user.isAdmin,
               
          };
     } catch (error) {
          console.log(error)
          return null
          
     }
     
}