

import React from 'react'
import { SessionProvider } from "next-auth/react"

 interface op {
     children:React.ReactNode
 }
function AuthProvider({children}:op) {
  return (
     <SessionProvider >
     {children}
   </SessionProvider>
  )
}

export default AuthProvider