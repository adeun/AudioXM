"use server";

import { auth } from "../auth";
import prisma from "../db";
import { Temporal } from "@js-temporal/polyfill";


export default async function  SubscriptionPlan({plan}:{plan:"Student Plan" | "Premium" | "Professional", }) {
     try {
          const Session = await auth()
          const planList = [
               {
                    name: "Student Plan",
                    price: 8.99,
                    
               },
               {
                    name: "Premium",
                    price: 14.99,
                  
               },
               {
                    name: "Professional",
                    price: 9.99,
                   
               },
          ]
          const subscriptionPlan = planList.find(s => s.name === plan)

          if (subscriptionPlan && Session ) {
               const now = Temporal.Now.plainDateTimeISO();
               const futureDate = now.add({  months: 1 });
               await prisma.user.update({
                    where: {
                         id: Session.user.id,
                    },
                    data: {
                         Subscribed: true,
                         plan:{
                              create:{
                                   name: subscriptionPlan.name,
                                   price: subscriptionPlan.price,
                                   description:"",
                                   duration:futureDate.toString()
                                  
                              }
                         }
                         
                    },
               })
               return{status:true}
          }
     } catch (error) {
          console.error("Error updating Subscription Plan:", error);
          return{status:false}
          
     }
     
}