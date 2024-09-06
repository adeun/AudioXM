"use server"
import { zodLoginForm } from "@/lib/ZOD";
import { z } from "zod";
import { signIn } from "../auth";
import { AuthError } from "next-auth"



export async function LoginRoute(data:z.infer<typeof zodLoginForm>) {
     try {
          await signIn("credentials", data)
        } catch (error) {
          if (error instanceof AuthError) {
            // Handle auth errors
          }
          throw error // Rethrow all other errors
        }
     
}