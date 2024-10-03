import { auth as middleware } from "./server/auth";
import { NextRequest } from 'next/server';
import { Temporal } from "@js-temporal/polyfill";

import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";
const routes = {
     Protection: [


          /^\/AddSong\/?$/,
          /^\/EditSong\/[^\/]+\/?$/,
          /^\/Profile\/?$/,
          /^\/Settings\/?$/,


     ],
     Subscription: [
          /^\/Subscribe\/?$/,
     ],
     auth: [
          // /^\/auth\/?/, // matches '/auth'
          /^\/$/, // matches '/'
     ],
     SubscribedUsers: [
          /^\/Home\/?$/, // matches '/home/[dynamic]'
          /^\/Album\/[^\/]+\/?$/,
          /^\/Artist\/[^\/]+\/?$/,
          /^\/Discover\/?$/,
          /^\/Song\/[^\/]+\/?$/,

     ]

};


export default middleware((req) => {
     const pathname = req.nextUrl.pathname
     const Session = req.auth;
     const currentDate = Temporal.Now.plainDateISO();

     const isProtectedRoute = routes.Protection.some((pattern) => pattern.test(pathname));
     const isAuthRoute = routes.auth.some((pattern) => pattern.test(pathname));
     const isSubscriptionRoute = routes.Subscription.some((pattern) => pattern.test(pathname));
     const isSubscribedUsers = routes.SubscribedUsers.some((pattern) => pattern.test(pathname));
     // 1. If no session and route requires protection or subscription, redirect to home page
     if (!Session && (isProtectedRoute || isSubscribedUsers || isSubscriptionRoute)) {
          return NextResponse.redirect(new URL('/', req.nextUrl));  // Redirect to homepage
     }
     // 2. If user is logged in and tries to access the login route, redirect them to '/Home'
     if (Session && isAuthRoute) {
          return NextResponse.redirect(new URL('/Home', req.nextUrl));  // Redirect to the homepage
     }


     // 3. If the user is accessing a route requiring a subscription, check the subscription status
     if (Session && isSubscribedUsers) {
          const userPlan = Session.user.plan;

          // Check if user doesn't have an active plan or their subscription has expired
          if (!userPlan || Temporal.PlainDate.compare(Temporal.PlainDate.from(userPlan.duration), currentDate) === -1) {
               return NextResponse.redirect(new URL('/Subscribe', req.nextUrl));  // Redirect to subscription page
          }
     }
     //4 If the user is subscribed with an active plan, and the usual is in the subscribe route, take him to the homepage
     if (Session && isSubscriptionRoute){
          const userPlan = Session.user.plan;

          if (userPlan && Temporal.PlainDate.compare(Temporal.PlainDate.from(userPlan.duration), currentDate)  <= 0){
               return NextResponse.redirect(new URL('/Home', req.nextUrl));  // Redirect to the homepage
          }
     }



     return NextResponse.next();




})

export const config = {
     // The following matcher runs middleware on all routes
     // except static assets.
     matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};