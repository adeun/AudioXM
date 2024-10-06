"use server";
import bcrypt from "bcryptjs";

import { z } from "zod";
import prisma from "../db";
import { zodUpdateForm } from "@/lib/ZOD";

export default async function updateUser({ userId, formData, oldPassword }: { userId: string, formData: z.infer<typeof zodUpdateForm>, oldPassword: string, }) {
     try {
          //  Check if the user exists and update the user's data accordingly.
          const user = await prisma.user.findUnique({
               where: {
                    id: userId
               },
          })
          if (!user) {
               return { error: "User not found" };
          }
          const updateData = { ...formData }; // Copy formData into updateData

          if (formData.password && !(await bcrypt.compare(oldPassword, user.password))) {
               return { error: "Old password is incorrect" };
          }
          // if the new email has been taken
          if (formData.email){
               // Check if the new email is already taken
               const isEmailTaken = await prisma.user.findFirst({
                    where: {
                         email: formData.email,
                    },
               });
               if (isEmailTaken) {
                    return { error: "Email is already taken" };
               }
               updateData.email = formData.email;
          }
          if (formData.password) {
               // Hash the new password
               updateData.password = await bcrypt.hash(formData.password, 10);
          }
          // Step 4: Filter out any undefined values from updateData
          const filteredData = Object.fromEntries(
               Object.entries(updateData).filter(([_, value]) => value !== undefined)
          );
          await prisma.user.update({
               where: {
                    id: userId,
               },
               data: filteredData,
          })
          return { success: true, };
     } catch (error) {
          // Handle error
          console.error("Error updating user", error);

          return { error: "Error updating user" }

     }

}