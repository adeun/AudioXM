"use server";

import { zodSignUpForm } from "@/lib/ZOD";
import prisma from "../db";
import { z } from "zod";


export default async function SignUpRoute(data:z.infer< typeof zodSignUpForm>) {
     const {email ,password ,name ,birthDay ,PhoneNumber} =data
     
}