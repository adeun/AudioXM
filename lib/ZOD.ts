import { z } from "zod";
export const zodLoginForm = z.object({
     email: z.string().min(1 ,{message:"Please enter your email"}),
     password: z.string().min(1 ,{message:"Please enter your password"})
});


export const zodSignUpForm = z.object({
      email:z.string().email(),
     password: z.string().min(8 ,{message:"Password must be at least 8 characters"}),
     confirmPassword: z.string(),
     name: z.string(),
     PhoneNumber: z.number() .min(1000000000, { message: "Phone number must be at least 10 digits" }).max(9999999999, { message: "Phone number must not exceed 10 digits" }),
     birthDay:z.string(),
}).refine((data)=> data.password === data.confirmPassword ,{message:" confirm Password Does not match the password"}) 