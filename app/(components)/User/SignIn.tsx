'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
        router.push('/Admin')
      }catch(err){
        console.log('inside error on login')
        console.log(err)
        setError(true)
    }finally{
      setLoading(false)
    }
    
  }

  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Admin</Button>
      </DialogTrigger>
      <div className=" fixed">
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            If you don't have an account a new one will be created for you!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
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
        <DialogFooter>
          {loading&&<div className=" outline-1 outline-blue-400">{newUser?<div>Creating new user</div>:'Processing'}</div>}
          <Button onClick={SignupANDSignin} disabled={loading} type="submit" className="  bg-gradient-to-br from-orange-300 to-orange-700/80">Signin</Button>
        </DialogFooter>
      </DialogContent>
      </div>
    </Dialog>
    </div>
  )
}
