'use client'

import Link from "next/link";
import { useState } from "react"

const User=({user}:any)=>{
    const [email,setEmail]=useState(user?.email);
    async function signin(){
        const res=await fetch('/api/Signin/',{
            method:'POST',
            body:JSON.stringify({
                email:'myemail@123',
                password:'mypassword'
            })
        })
        const data=await res.json();
    }
    return (
        <>
            {email&&<div><Link href='/Admin'>{email}</Link></div>}
            {!email&&<div>Admin</div>}
        </>
    )
}

export default User;
