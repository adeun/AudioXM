import { auth as middleware } from "./server/auth";
import { NextRequest } from 'next/server';

import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";
const routes = {
     Protection: [

          /^\/Home\/?$/, // matches '/home/[dynamic]'
          /^\/Album\/[^\/]+\/?$/,
          /^\/Artist\/[^\/]+\/?$/,
          /^\/Discover\/?$/,
          /^\/Song\/[^\/]+\/?$/,
          /^\/AddSong\/?$/,
          

     ],
     Subscription :[
          /^\/Subscribe\/?$/,
     ],
     auth: [
          // /^\/auth\/?/, // matches '/auth'
          /^\/$/, // matches '/'
     ],

};


export default  middleware((req) => {
      const pathname = req.nextUrl.pathname
      const user = req.auth
     const isProtectedRoute = routes.Protection.some((pattern) => pattern.test(pathname));
     const isAuthRoute = routes.auth.some((pattern) => pattern.test(pathname));
     const isSubscriptionRoute = routes.Subscription.some((pattern) => pattern.test(pathname));
     
     
     
     if (isProtectedRoute && user && user?.user.Subscribed === false){
          return NextResponse.redirect(new URL('/Subscribe', req.nextUrl));
     }
     if (isAuthRoute && user ){
          return NextResponse.redirect(new URL('/Home', req.nextUrl));
     }
     if (isProtectedRoute && !user){
          return NextResponse.redirect(new URL('/', req.nextUrl));
     }
     
     if (isSubscriptionRoute && user?.user.Subscribed){
          return NextResponse.redirect(new URL('/Home', req.nextUrl));
     }
     return NextResponse.next();




})

export const config = {
     // The following matcher runs middleware on all routes
     // except static assets.
     matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};