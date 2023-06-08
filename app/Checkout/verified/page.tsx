'use client'

import { useEffect } from "react"
import { CartItem } from "@/app/utils/schema/CartITem";

async function insert_orders(){
    const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            console.log('inserting orders')
            try{
                data.items.map(async(i:CartItem)=>{
                const inserting=await fetch(`/api/Orders`,{method:'POST',body:JSON.stringify({item:i})});
                console.log('after post')
                console.log(inserting)
                const deleting=await fetch(`/api/cart?key=${i.pkey}`,{
                  method:'DELETE'
                    })
                console.log(deleting)
                })
                
            }catch(err){
              console.log('error in insertint/del')
            }
}

export default function verified(){
    useEffect(()=>{
        insert_orders()
    },[])
    return (
        <div>
            Verified payment
        </div>
    )
}