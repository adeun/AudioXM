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
          /^\/EditSong\/[^\/]+\/?$/,
          /^\/Profile\/?$/,
          /^\/Settings\/?$/,
          

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
      const Session = req.auth
     const isProtectedRoute = routes.Protection.some((pattern) => pattern.test(pathname));
     const isAuthRoute = routes.auth.some((pattern) => pattern.test(pathname));
     const isSubscriptionRoute = routes.Subscription.some((pattern) => pattern.test(pathname));
     
     
     
     if (isProtectedRoute && Session && Session?.user.plan?.Subscribed === false){
          return NextResponse.redirect(new URL('/Subscribe', req.nextUrl));
     }
     if (isAuthRoute && Session ){
          return NextResponse.redirect(new URL('/Home', req.nextUrl));
     }
     if (isProtectedRoute && !Session){
          return NextResponse.redirect(new URL('/', req.nextUrl));
     }
     
     if (isSubscriptionRoute && Session?.user.plan?.Subscribed){
          return NextResponse.redirect(new URL('/Home', req.nextUrl));
     }
     return NextResponse.next();




})

export const config = {
     // The following matcher runs middleware on all routes
     // except static assets.
     matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};