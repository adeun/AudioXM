"use client"
import React, { useState } from 'react'
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { zodLoginForm, zodSignUpForm } from '@/lib/ZOD'
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from '@tanstack/react-query'
import { LoginRoute } from '@/server/authAction/Login'
import SignUpRoute from '@/server/authAction/SignUp'


export default function AuthCard() {
     const [authState, seAuthState] = useState<"login" | "signUp">("login")
     const LoginMutation = useMutation({
          mutationFn:LoginRoute
     })
     const SignUpMutation = useMutation({
          mutationFn:SignUpRoute
     })
     const { toast } = useToast()

     const [pass, setPass] = useState({
          password: true,
          confirmPassword: true,
          passwordLogin: true,
     })
     const [lognForm, setLognForm] = useState({
          email: "",
          password: "",
     })
     const [signUpForm, setSignUpForm] = useState({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          PhoneNumber: 0,
          birthDay: "",

     })
     function Login() {
          const VerifyLogin = zodLoginForm.safeParse(lognForm)
          const VerifyLoginError = VerifyLogin.error?.errors
          if (VerifyLoginError) {
               VerifyLoginError.forEach(err => {
                    toast({
                         title: ` Error at ${err.path[0]}`,
                         description: err.message,
                    })
               })

          }
          if (VerifyLogin.data){
               LoginMutation.mutate(VerifyLogin.data)
               toast({
                    title: "Login Successful",
                    description: "Welcome",
               })
               setLognForm({ email: "", password: "" })
          }


     }
     function SignUp() {
          const VerifyLogin = zodSignUpForm.safeParse(signUpForm)
          const VerifyLoginError = VerifyLogin.error?.errors
          if (VerifyLoginError) {
               VerifyLoginError.forEach(err => {
                    toast({
                         title: ` Error at ${err.path[0]}`,
                         description: err.message,
                    })
               })

          }
          if (VerifyLogin.data){
               SignUpMutation.mutate(VerifyLogin.data)
               toast({
                    title: "Sign Up Successful",
                    description: "Welcome",
               })
               seAuthState('login')
               setSignUpForm({ email: "", password: "", confirmPassword: "", name: "", PhoneNumber: 0, birthDay: "" })
              
          }

     }

     return (
          <>
               {
                    authState === "login" ? (
                         <Card className=' w-[30%]'>
                              <CardHeader>
                                   <CardTitle>Login</CardTitle>
                              </CardHeader>
                              <CardContent>
                                   <div>
                                        <Label htmlFor="email">Your email address</Label>
                                        <Input
                                             type="email"
                                             id="email"
                                             name="email"
                                             placeholder="Enter your email"
                                             value={lognForm.email}
                                             onChange={(e) => setLognForm(preData => ({ ...preData, email: e.target.value }))}

                                        />
                                   </div>
                                   <div>
                                        <Label htmlFor="password">password</Label>
                                        <div className=' flex flex-row gap-2 items-center'>
                                             <Input
                                                  className=''
                                                  type={pass.passwordLogin ? "password" : "text"}

                                                  id="password"
                                                  name="password"
                                                  placeholder="Enter your password"
                                                  value={lognForm.password}
                                                  onChange={(e) => setLognForm(preData => ({ ...preData, password: e.target.value }))}


                                             />
                                             <div onClick={() => setPass(perData => ({ ...perData, passwordLogin: !perData.passwordLogin }))}>
                                                  {pass.passwordLogin ? <EyeOff /> : <Eye />}
                                             </div>

                                        </div>
                                   </div>

                              </CardContent>
                              <CardFooter>
                                   <Button onClick={Login}>Login</Button>
                                   <Button onClick={() => seAuthState("signUp")} variant="link"> create an account</Button>
                              </CardFooter>
                         </Card>
                    ) : (
                         <Card className=' w-[45%]'>
                              <CardHeader>
                                   <CardTitle>signUp</CardTitle>
                              </CardHeader>
                              <CardContent className=' flex flex-row items-center justify-center gap-2 '>
                                   <div className=' flex flex-col gap-1 '>
                                        <div>
                                             <Label htmlFor="email">Your email address</Label>
                                             <Input
                                                  className=' w-[285px] '
                                                  disabled ={SignUpMutation.isPending}


                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  placeholder="Enter your email"
                                                  value={signUpForm.email}
                                                  onChange={(e) => setSignUpForm(preData => ({ ...preData, email: e.target.value }))}

                                             />
                                        </div>

                                        <div>
                                             <Label htmlFor="name">Your full name</Label>
                                             <Input
                                                  className=' w-[285px]'
                                                  disabled ={SignUpMutation.isPending}
                                                  type="text"
                                                  id="name"
                                                  name="name"
                                                  placeholder="Enter your name"
                                                  value={signUpForm.name}
                                                  onChange={(e) => setSignUpForm(preData => ({ ...preData, name: e.target.value }))}

                                             />
                                        </div>

                                        <div>
                                             <Label htmlFor="PhoneNumber">Your Phone Number </Label>
                                             <Input
                                               disabled ={SignUpMutation.isPending}
                                                  className=' w-[285px]'
                                                  type="number"
                                                  id="PhoneNumber"
                                                  name="PhoneNumber"
                                                  placeholder="Enter your Phone Number"
                                                  value={signUpForm.PhoneNumber ===0 ?"":signUpForm.PhoneNumber}
                                                  onChange={(e) => setSignUpForm(preData => ({ ...preData, PhoneNumber: Number(e.target.value) }))}

                                             />
                                        </div>

                                   </div>


                                   <div className=' flex flex-col gap-1 '>
                                        <div>
                                             <Label htmlFor="birthDay"> birthDay</Label>
                                             <Input
                                                  className=' w-[285px]'
                                                  disabled ={SignUpMutation.isPending}
                                                  type="Date"
                                                  id="birthDay"
                                                  name="password"
                                                  placeholder="Enter your birthDay"
                                                  value={signUpForm.birthDay}
                                                  onChange={(e) => setSignUpForm(preData => ({ ...preData, birthDay: e.target.value }))}


                                             />
                                        </div>


                                        <div>
                                             <Label htmlFor="password">password</Label>
                                             <div className=' flex flex-row gap-2 items-center'>
                                                  <Input
                                                       className=' w-[285px]'
                                                       disabled ={SignUpMutation.isPending}
                                                       type={pass.password ? "password" : "text"}
                                                       id="password"
                                                       name="password"
                                                       placeholder="Enter your password"
                                                       value={signUpForm.password}
                                                       onChange={(e) => setSignUpForm(preData => ({ ...preData, password: e.target.value }))}

                                                  />
                                                  <div onClick={() => setPass(perData => ({ ...perData, password: !perData.password }))}>
                                                       {pass.password ? <EyeOff /> : <Eye />}
                                                  </div>

                                             </div>

                                        </div>

                                        <div>
                                             <Label htmlFor="confirmPassword"> verify password</Label>
                                             <div className=' flex flex-row gap-2 items-center'>
                                                  <Input
                                                    disabled ={SignUpMutation.isPending}
                                                       className=' w-[285px]'
                                                       type={pass.confirmPassword ? "password" : "text"}
                                                       id="confirmPassword"
                                                       name="confirmPassword"
                                                       placeholder="Enter your confirm Password"
                                                       value={signUpForm.confirmPassword}
                                                       onChange={(e) => setSignUpForm(preData => ({ ...preData, confirmPassword: e.target.value }))}

                                                  />
                                                  <div onClick={() => setPass(perData => ({ ...perData, confirmPassword: !perData.confirmPassword }))}>
                                                       {pass.confirmPassword ? <EyeOff /> : <Eye />}
                                                  </div>

                                             </div>
                                        </div>

                                   </div>





                              </CardContent>
                              <CardFooter>
                                   <Button   disabled ={SignUpMutation.isPending} onClick={SignUp}>signUp</Button>
                                   <Button onClick={() => seAuthState("login")} variant="link"> already have an account</Button>
                              </CardFooter>
                         </Card>
                    )

               }





          </>
     )
}
