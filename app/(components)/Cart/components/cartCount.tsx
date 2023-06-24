'use client'

import { useContext, useState,useEffect } from "react"
import { CartItem } from "@/app/api/cart/route";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../CartStorage/Store";
import { CartAction } from "../CartStorage/CartSlice";

export default function CartCount(){
    const dispatch=useDispatch();
    const totalItems=useSelector((state:RootState)=>state.CartSlice.items);
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
    //         const data = await response.json();
    //         dispatch(CartAction.ClearCart())
    //         data.items.map((d:CartItem)=>{
    //             dispatch(CartAction.ItemAmountIncrement(d.quantity));
    //             console.log('cart counter')
    //         })
    //     } catch (error) {
    //     console.error("Error fetching data:", error);
    //     }
    // };
    // useEffect(()=>{
    //     fetchData()
    // },[])
    return (
        
            <div className=' bg-green-500/70 px-2 text-center absolute ml-3 text-black/70 rounded-full text-xl font-semibold z-10'>{totalItems}</div>
              
    )
}