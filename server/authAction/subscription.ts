"use server";

import { auth } from "../auth";
import prisma from "../db";
import { Temporal } from "@js-temporal/polyfill";

// SubscriptionPlan function for updating or creating a new subscription plan
export default async function SubscriptionPlan({ plan }: { plan: "Student Plan" | "Premium" | "Professional", }) {
     try {
          // Get the session of the current user
          const Session = await auth();

          // List of available plans with names and prices
          const planList = [
               { name: "Student Plan", price: 8.99 },
               { name: "Premium", price: 14.99 },
               { name: "Professional", price: 9.99 },
          ];

          // Find the plan that matches the one provided as an argument
          const subscriptionPlan = planList.find(s => s.name === plan);

          // Check if subscription plan exists and user is authenticated
          if (subscriptionPlan && Session) {
               const now = Temporal.Now.plainDateTimeISO(); // Get current date and time
               const futureDate = now.add({ months: 1 });   // Add 1 month to the current date for plan duration

               // Check if the user already has a subscription plan
               const getUserPlan = await prisma.subscriptionPlan.findUnique({
                    where: {
                         id: Session.user.id,  // Ensure the correct user ID is used
                    },
                    select: {
                         id: true,
                         duration: true,
                         Subscribed: true,   
                    },
               });

               // If the user has a subscription and it is still active, 
               if (getUserPlan && getUserPlan.Subscribed && Temporal.PlainDate.compare(Temporal.PlainDate.from(getUserPlan.duration), now) === 1) {
                    return { status: false, message: "User already has an active subscription" };
               }

               // If the user had a subscription but it is expired or near expiration, update the plan
               if (getUserPlan && (!getUserPlan.Subscribed || Temporal.PlainDate.compare(Temporal.PlainDate.from(getUserPlan.duration), now) === -1)) {
                    await prisma.subscriptionPlan.update({
                         where: { id: Session.user.id },
                         data: {
                              Subscribed: true,
                              duration: futureDate.toString(),  // Update the plan's expiration date to 1 month in the future
                              name: subscriptionPlan.name,
                              price: subscriptionPlan.price,
                         }
                    });
                    return { status: true, message: "Subscription updated successfully" };
               }

               // If the user doesn't have a subscription, create a new one
               if (!getUserPlan) {
                    await prisma.user.update({
                         where: { id: Session.user.id },
                         data: {
                              plan: {
                                   create: {
                                        name: subscriptionPlan.name,
                                        price: subscriptionPlan.price,
                                        duration: futureDate.toString(),  // Set the expiration date to 1 month in the future
                                        Subscribed: true,
                                        description: "",
                                   }
                              }
                         }
                    });
                    return { status: true, message: "Subscription created successfully" };
               }
          }
     } catch (error) {
          // Handle any errors that occur during the process
          console.error("Error updating Subscription Plan:", error);
          return { status: false, message: "Error updating Subscription Plan" };
     }
}
