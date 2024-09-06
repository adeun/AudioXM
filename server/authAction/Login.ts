"use server"
import { zodLoginForm } from "@/lib/ZOD";
import { z } from "zod";
import { signIn } from "../auth";


export async function LoginRoute(data:z.infer<typeof zodLoginForm>) {
     try {
          await signIn("credentials" ,{...data ,redirectTo:"/Home"});
          
     } catch (error) {
          
     }
     
}