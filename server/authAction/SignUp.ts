"use server";

import { zodSignUpForm } from "@/lib/ZOD";
import prisma from "../db";
import { z } from "zod";
import bcrypt from "bcrypt";


export default async function SignUpRoute(data:z.infer< typeof zodSignUpForm>) {
     const {email ,password ,name ,birthDay ,PhoneNumber} =data
     try {
          const hashedPassword = await bcrypt.hash(password, 10)
          const user = await prisma.user.create({
               data: {
                    email : email,
                    password: hashedPassword,
                    name: name,
                    birth:birthDay,
                    PhoneNumber
               },
          })
          
          
          
     } catch (error) {
          console.log(error);
          
     }
     
}