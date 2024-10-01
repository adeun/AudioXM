import { z } from "zod";
const allowedDomains = ["example.com", "mydomain.org"];
// List of known public domains (e.g., Gmail, Yahoo, etc.)
const publicDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

export const zodLoginForm = z.object({
     email: z.string().min(1, { message: "Please enter your email" }),
     password: z.string().min(1, { message: "Please enter your password" })
});


export const zodSignUpForm = z.object({
     email: z.string().email(),
     password: z.string()
          .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
          .max(128, { message: "Password must be at most 128 characters long" }) // Maximum length
          .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
          .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
          .regex(/\d/, { message: "Password must contain at least one digit" }) // At least one digit
          .regex(/[\W_]/, { message: "Password must contain at least one special character" }), // At least one special character,
     confirmPassword: z.string(),
     name: z.string(),
     PhoneNumber: z.number().min(1000000000, { message: "Phone number must be at least 10 digits" }).max(9999999999, { message: "Phone number must not exceed 10 digits" }),
     birthDay: z.string(),
}).refine((data) => data.password === data.confirmPassword, { message: " confirm Password Does not match the password" })


export const AlbumUploadForm = z.object({
     name: z.string().min(2),
     artist: z.array(z.string()),
     cover: z.object({
          id: z.string(),
          path: z.string(),
          name: z.string(),
          type: z.string(),
          size: z.string(),
     }).nullable(),
     release_date: z.string().date(),
     songs: z.array(z.object({
          id: z.string(),
          path: z.string(),
          name: z.string(),
          type: z.string(),
          size: z.string(),
          duration: z.number(),
     }))

});



export const zodUpdateForm = z.object({
     email: z.string()
          .email("Invalid email format") // Basic email validation provided by Zod
          .min(6, "Email must be at least 6 characters long") // Minimum length
          .max(256, "Email must be less than 256 characters long") // Maximum length
          .regex(
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
               "Email must not contain spaces or invalid characters"
          ) // Additional regex check for valid email characters
          .refine((email) => {
               const domain = email.split("@")[1];

               // Check if the domain is either in the list of public domains, the system's auto domain, or a valid custom domain
               const isPublicDomain = publicDomains.includes(domain);
               const isCustomDomain = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(domain); // Validates custom domains
               return isPublicDomain  || isCustomDomain;
          }, `Email must be from a valid domain (public, custom)`)
          .optional(),

     password: z.string()
          .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
          .max(128, { message: "Password must be at most 128 characters long" }) // Maximum length
          .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
          .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
          .regex(/\d/, { message: "Password must contain at least one digit" }) // At least one digit
          .regex(/[\W_]/, { message: "Password must contain at least one special character" }) // At least one special character
          .optional(),// Make the field optional if necessary
     name: z.string().optional(),
     PhoneNumber: z.string().regex(/^[1-9]\d{0,8}$/, { message: "Phone number must be between 1 and 9 digits and contain only numbers" }).optional(), // Example regex for E.164 phone numbers
     birth: z.string().optional(),
}).strict()