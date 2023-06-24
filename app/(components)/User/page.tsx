'use client'

import Link from "next/link";
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { AdminSignIn } from "./SignIn";
//import {AdminSignin} from "./AdminSignin";
  

const User=({user}:any)=>{
    const [email,setEmail]=useState(user?.email);
    const [logout,setLogout]=useState(false)
    const {toast}=useToast()
    const router=useRouter()
    // async function signin(){
    //     const res=await fetch('/api/Signin/',{
    //         method:'POST',
    //         body:JSON.stringify({
    //             email:'myemail@123',
    //             password:'mypassword'
    //         })
    //     })
    //     const data=await res.json();
    // }

    const handleLogout=async()=>{
       
        setLogout(true)
        toast({
            title:'Logging out',
            description:'Logging you out of admin pannel'
        })
        console.log('toasted')
        const l=await fetch('/api/auth/Signout');
        console.log(l)
        if(!l.ok){
            toast({
                variant:'destructive',
                title:'Oh! something wrong happened',
                description:"we couldn't log you out",
                action:<ToastAction altText="logout again"  onClick={handleLogout}>Try Again</ToastAction>
            })
            return;
        }
        router.refresh()
        router.push('/')
        setLogout(false)
    }
    return (
        <>
            {email&&
            <DropdownMenu>
                <DropdownMenuTrigger>{email}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href='/Admin'><DropdownMenuLabel>Admin Page</DropdownMenuLabel></Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} disabled={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>}

            {!email&&<AdminSignIn/>}
        </>
    )
}

export default User;
