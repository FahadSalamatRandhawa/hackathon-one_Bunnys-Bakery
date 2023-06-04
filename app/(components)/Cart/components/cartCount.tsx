'use client'

import { useContext, useState,useEffect } from "react"
import { CartContext, CartProvider } from "../cartContext"



export default function CartCount(){
    let {items,setItems}=useContext(CartContext)
    console.log(items,'inside top counter')
    return (
        
            <div className=' bg-green-500/70 px-2 text-center absolute ml-3 text-black/70 rounded-full text-xl font-semibold z-10'>{items}</div>
              
    )
}