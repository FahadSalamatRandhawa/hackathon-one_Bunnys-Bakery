'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function AdminSignIn() {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [newUser,setNewUser]=useState(false);
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const {toast}=useToast()

  const router = useRouter();

  async function SignupANDSignin() {
        if(email==''||password==''){
          return;
        }
        setError(false)
        setLoading(true)
        const response=await fetch('/api/auth/Signup',{
        method:'POST',
        body:JSON.stringify({email,password})
      })
      console.log(email,password)
      const signupRes=await response.json()
      console.log(signupRes)
      if(!response.ok){
        setNewUser(true);
        return;
        
      }

      try{
        const login=await fetch('/api/auth/Signin',{
          method:'POST',
          body:JSON.stringify({email,password})
        })
        console.log(email,password)
        const loginRes=await login.json()
        console.log(loginRes)
        if(!loginRes.ok){
          setError(true)
          setLoading(false)
        }
        router.push('/Admin')
      }catch(err){
        console.log('inside error on login')
        console.log(err)
        setError(true)
        setLoading(false)
    }
    
  }

  return (
    <div>
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Admin</Button>
      </SheetTrigger >
      <div className=" absolute ">
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Admin Login</SheetTitle>
          <SheetDescription>
            If you don't have an account a new one will be created for you!
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input id="email" type="email" className="col-span-3" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input id="password" type='password' className="col-span-3" onChange={(e)=>{setPassword(e.target.value)}}  />
          </div>
        </div>
        <SheetFooter>
          {loading&&<div className=" outline-1 outline-blue-400">{newUser?<div>Creating new user</div>:'Processing'}</div>}
          {error&&<div className=" text-red-500" >Password may be wrong </div>}
          <Button onClick={SignupANDSignin} disabled={loading} type="submit" className="  bg-gradient-to-br from-orange-300 to-orange-700/80">Signin</Button>
        </SheetFooter>
      </SheetContent>
      </div>
    </Sheet>
    </div>
  )
}
