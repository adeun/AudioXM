import { auth as middleware } from "./server/auth";
import { NextResponse } from 'next/server'

const routes = {
     Protection: [
          /^\/$/, // matches '/'
          /^\/Home\/[^\/]+\/?$/, // matches '/home/[dynamic]'

     ],
     auth: [
          /^\/auth\/?/, // matches '/auth'
     ],

};


export default middleware((req)=>{
      const pathname = req.nextUrl.pathname
     const isProtectedRoute = routes.Protection.some((pattern) => pattern.test(pathname));
     const isAuthRoute = routes.auth.some((pattern) => pattern.test(pathname));
    
   
})


export const config = {
     // The following matcher runs middleware on all routes
     // except static assets.
     matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
   };