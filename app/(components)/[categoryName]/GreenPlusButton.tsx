'use client'

import { IProduct } from "./ProductCard";

export default function GreenPlusButton({_key,product}:{product:IProduct,_key:string}){

    async function AddCartSingle(){
        await fetch('/api/cart',{
            method:'POST',
            body:JSON.stringify({
                
            })
        })
    }

    return (
        <button onClick={ (event) => {event.preventDefault();alert('This product is available')}} className=" w-5 place-self-center justify-center self-center text-center justify-self-end font-bold text-2xl h-5 text-[#12A305] rounded-full">+</button>
    )
}