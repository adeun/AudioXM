// auth.ts

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./db"
import bcrypt from "bcrypt";
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


                         const { email, password } = await zodLoginForm.parseAsync(Credential)

                         // find the user
                         const getUser = await prisma.user.findFirst({
                              where: {
                                   email: email,
                              },
                         })
                         // if the user is not found
                         if (!getUser) { return null; }

                         // validate the password
                         const validate = await bcrypt.compare(password ,getUser.password)
                         if (validate) {
                              return getUser;
                         }




                         // return JSON object with the user data
                         return null
                    } catch (error) {

                         return null
                    }
               },
          }),

     ],
     callbacks: {
          jwt({ token, user }) {
               if (user && user.id) { // User is available during sign-in
                    token.id = user.id

               }
               return token
          },

          session({ session, token }) {

               return {
                    ...session
                    , user: {
                         ...session.user,
                         id: token.id,

                    }
               }
          },
          signIn(params) {
               return true
          },


     },
})