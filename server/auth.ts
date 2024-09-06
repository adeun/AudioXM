
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
                         console.log("Credentials:", credentials);



                         const { email, password } = await zodLoginForm.parseAsync(credentials)
                         console.log("Credentials ---- V", email, password);


                         // Find the user by email in the database
                         const getUser = await prisma.user.findFirst({
                              where: {
                                   email: email,
                              },
                         })
                         console.log("getUser:", getUser);


                         // if the user is not found
                         if (!getUser) { return null; }
                         console.log("getUser ---- V", getUser);


                         // validate the password
                         const validate = await bcrypt.compare(password, getUser.password)
                         console.log("validate ---- V", validate);
                         if (validate) {
                              // If password validation passes, return the user

                              return getUser;
                         }




                         // If password validation fails, return null
                         return null
                    } catch (error) {
                         console.log(" catch error:", error);


                         return null
                    }
               },
          }),

     ],
     callbacks: {
          jwt({ token, user }) {
               console.log('jwt old',{
                    token,
                    user,

               });
               
               if (user && user.id && user.email) { // User is available during sign-in
                    token.id = user.id
                    token.email = user.email; // Ensure user email or other data is stored if needed


               }
               console.log('jwt New',{
                    token,
                    user,

               });
               return token
          },

          session({ session, token }) {

               if (token?.id) {
                    return {
                         ...session,
                         user: {
                              ...session.user,
                              id: token.id,
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