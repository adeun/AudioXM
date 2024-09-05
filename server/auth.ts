import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"


export const { handlers, signIn, signOut, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: {
          strategy: "jwt"
     },
     providers: [],
     callbacks: {
          jwt({ token, user }) {
               if (user && user.id) { // User is available during sign-in
                    token.id = user.id
                    token.role = user.role
               }
               return token
          },

          session({ session, token }) {

               return {
                    ...session
                    , user: {
                         ...session.user,
                         id: token.id,
                         role: token.role
                    }
               }
          },
          signIn(params) {
               return true
          },




     },
})