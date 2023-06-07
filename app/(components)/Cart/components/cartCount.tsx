'use client'

import { useContext, useState,useEffect } from "react"
import { CartItem } from "@/app/api/cart/route";

export default function CartCount(){
    const [count,setCount]=useState(0)
    let c=0;
    const fetchData = async () => {
        try {
            const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            
            data.items.map((i:CartItem)=>{c+=i.quantity});
            console.log(data)
            setCount(c)
            return c
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    fetchData().then((d)=>console.log(d)).catch((err)=>{console.log('error in top counter')})
    
    return (
        
            <div className=' bg-green-500/70 px-2 text-center absolute ml-3 text-black/70 rounded-full text-xl font-semibold z-10'>{count}</div>
              
    )
}