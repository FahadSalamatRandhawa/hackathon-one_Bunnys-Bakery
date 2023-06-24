'use client'
import { useEffect } from "react";

async function insert_orders(){
    const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const {items} = await response.json();
            console.log('orders in verified page')
            console.log(items)
            const inserting=await fetch(`/api/AddOrder`,{method:'POST',body:JSON.stringify({items})});
            if(!inserting.ok){
                console.log('order insert error ni validate')
                console.log(await inserting.json())
            }
            try{
                items.map(async(i:any)=>{
                    let del=await fetch(`/api/cart?key=${i.pkey}`,{method:'DELETE'});
                    if(!del.ok){
                        console.log('could not delete pkey = ',i.pkey)
                    }
                    console.log('deleted cartItem with pkey:',i.pkey)
                })
            }catch(err){
                console.log('error in deleting orders')
            }
}

export default function verified(){
    useEffect(()=>{
        insert_orders().then(()=>{'inserted'})
    },[])
    
    return (
        <div>
            Verified payment
        </div>
    )
}