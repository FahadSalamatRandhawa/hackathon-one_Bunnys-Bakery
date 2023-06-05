'use client'

import { useEffect, useState } from "react"
import { CartItem } from "../api/cart/route"

export default function Items(){
    let [data, setData] = useState<{items:CartItem[]}>();

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            console.log(data)
            setData(data);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchData().then(()=>console.log('fetched in checkout')).catch((err)=>console.log('erro in checkout',err))
    },[])

    return(
        <>
            <div className=" w-[400px] max-h-[500px] bg-gradient-to-bl from-slate-600/60 to-slate-400/20 grid grid-cols-1">
                {
                    data?.items.map((d)=>(<div className=" flex justify-around h-10 md:gap-4 items-center px-2 border-y-white border-b-2">
                        <div className=" w-24 overflow-hidden">{d.productName}</div>
                        <div>{d.category}</div>
                        <div>{d.variant}</div>
                        <div>{d.quantity} items</div>
                        <div>$ {d.totalcost}</div>
                    </div>))
                }
            </div>
        </>
    )
}