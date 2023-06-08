"use client"
import { redirect } from "next/navigation";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [newUser,setNewUser]=useState(false);
  const [error,setError]=useState(false)

  const router = useRouter();

  async function handleSubmit() {
    console.log('inside submit')
    
      const response=await fetch('/api/auth/Signup',{
        method:'POST',
        body:JSON.stringify({email,password})
      })
      const signupRes=await response.json()
      if(response.ok){
        setNewUser(true);
      }


      try{
        const login=await fetch('/api/auth/Signin',{
          method:'POST',
          body:JSON.stringify({email,password})
        })
        const loginRes=await login.json()
        console.log(loginRes)
        router.push('/')
      }catch(err){
        console.log('inside error')
        setError(true)
      }
    
  }

  return (
    <>
        <div onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" />
          <label>Password</label>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="password"/>
          <button onClick={handleSubmit}>Submit</button>
          {newUser&&<div>New User Created</div>}
          {error&&<div>error on login</div>}
        </div>
    </>
  )
}
