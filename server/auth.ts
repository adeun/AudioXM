
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./db"
import bcrypt from "bcryptjs";
import { zodLoginForm } from "@/lib/ZOD"
type Login = {
     createdAt: Date;
     updatedAt: Date;
     id: string;
     email: string;
     emailVerified: Date | null;
     name: string | null;
     image: string | null;
     password: string;
} | null
type Plan = {
     id: string,
     Subscribed: boolean,
     name: string,
     description: string,
     price: number
     duration: string,
}

export const { handlers, signIn, signOut, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: {
          strategy: "jwt"
     },
     secret: process.env.AUTH_SECRET,
     debug: true, // enable debug logs
     providers: [
          Credentials({
               // You can specify which fields should be submitted, by adding keys to the `credentials` object.
               // e.g. domain, username, password, 2FA token, etc.
               credentials: {
                    email: {},
                    password: {},
               },
               authorize: async (credentials) => {
                    try {
                         const { email, password } = await zodLoginForm.parseAsync(credentials)

                         // Find the user by email in the database
                         const getUser = await prisma.user.findFirst({
                              where: {
                                   email: email,
                              },
                              include: {
                                   plan: {
                                        select: {
                                             id: true,
                                             Subscribed: true,
                                             name: true,
                                             description: true,
                                             price: true,
                                             duration: true,
                                        },
                                   },
                              },
                         })

                         // if the user is not found
                         if (!getUser) { return null; }



                         // validate the password
                         const validate = await bcrypt.compare(password, getUser.password)

                         if (validate) {
                              // If password validation passes, return the user

                              return getUser;
                         }




                         // If password validation fails, return null
                         return null
                    } catch (error) {
                         console.error("Error during authorization:", error);
                         return null;

                    }
               },
          }),

     ],
     callbacks: {
          async jwt({ token, user, account }) {


               if (user && user.id && user.email) { // User is available during sign-in
                    let isArtistA = false
                    let userPlan: Plan | null = null;
                    if (user?.id && !user?.isArtist || !user?.plan) {
                         const userDB = await prisma.user.findUnique({
                              where: { id: user.id, email: user.email },
                              select:{
                                   isArtist:true,
                                   isAdmin:true,
                                   plan:{
                                        select: {
                                             id: true,
                                             Subscribed: true,
                                             name: true,
                                             description: true,
                                             price: true,
                                             duration: true,
                                        }
                                   },
                              }
                         })
                         if (userDB) {
                              isArtistA = userDB.isArtist
                              userPlan = userDB.plan
                         }

                    }
                    console.log("Token before update:", token);

                    token.id = user.id
                    token.email = user.email; // Ensure user email or other data is stored if needed
                    token.isArtist = isArtistA;
                    token.isAdmin = user.isAdmin;
                    token.plan = userPlan; // Add your additional user properties here

               }
               if (account) {
                    token.accessToken = account.accessToken
               }

               return token
          },

          async session({ session, token }) {
               let isArtistA = false
               let userPlan: Plan | null = null;
               if (token?.id && !token?.isArtist || !token?.Subscribed) {
                    const userDB = await prisma.user.findUnique({ 
                         where: { id: token.id, email: token.email } ,
                         select:{
                              isArtist:true,
                              isAdmin:true,
                              plan:{
                                   select: {
                                        id: true,
                                        Subscribed: true,
                                        name: true,
                                        description: true,
                                        price: true,
                                        duration: true,
                                   }
                              },
                         }

                    })
                    if (userDB) {
                         isArtistA = userDB.isArtist
                         userPlan = userDB.plan
                    }

               }


               if (token?.id) {
                    return {
                         ...session,
                         user: {
                              ...session.user,
                              id: token.sub,
                              isArtist: isArtistA,
                              isAdmin: token.isAdmin,
                              plan: userPlan,

                              accessToken: token.accessToken
                         },
                    };
               }
               return session;  // Add this to return the default session if there's no token.
          },
          signIn(params) {
               // Called when a user signs in
               console.log("signIn params:", params);
               return true;
          },


     },
})