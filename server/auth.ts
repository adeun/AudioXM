
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
                    let SubscribedA = false
                    if (user?.id && !user?.isArtist || !user?.Subscribed) {
                         const userDB = await prisma.user.findUnique({ where: { id: user.id, email: user.email } })
                         if (userDB) {
                              isArtistA = userDB.isArtist
                              SubscribedA = userDB.Subscribed
                         }

                    }
                    console.log("Token before update:", token);

                    token.id = user.id
                    token.email = user.email; // Ensure user email or other data is stored if needed
                    token.isArtist = isArtistA;
                    token.isAdmin = user.isAdmin;
                    token.Subscribed = SubscribedA; // Add your additional user properties here

               }
               if (account) {
                    token.accessToken = account.accessToken
               }

               return token
          },

          async session({ session, token }) {
               let isArtistA = false
               let SubscribedA = false
               if (token?.id && !token?.isArtist || !token?.Subscribed) {
                    const userDB = await prisma.user.findUnique({ where: { id: token.id, email: token.email } })
                    if (userDB) {
                         isArtistA = userDB.isArtist
                         SubscribedA = userDB.Subscribed
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
                              Subscribed: SubscribedA,

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