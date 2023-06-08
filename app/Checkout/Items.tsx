'use client'
import { useEffect, useState } from "react"
import { CartItem } from "../api/cart/route"
import Image from "next/image";

export default function Items(){
    let [data, setData] = useState<{items:CartItem[]}>();
    const [amount,setAmount]=useState(0)
    const fetchData = async () => {
        try {
            const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            console.log(data)
            setData(data);
            let a=0;
            data.items.map((i:CartItem)=>((a+=Number(i.quantity*Number(i.price)))))
            setAmount(a)
            return data
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    useEffect(()=>{
        fetchData().then((d)=>{console.log('fetched in checkout')}).catch((err)=>console.log('erro in checkout',err))
    },[])
    if(!data){
        return(
            <div>Not cart items</div>
        )
    }
    return(
        <>
            <div className=" md:w-[400px] h-max max-h-[400px] bg-gradient-to-bl from-slate-600/60 to-slate-400/20 grid grid-cols-1">
                {
                    data?.items.map((d)=>(
                        <div key={d.pkey} className=" flex justify-around h-10 md:gap-4 items-center px-2 border-y-white border-b-2 text-start">
                        <div className=" w-24 truncate">{d.productName}</div>
                        <div className=" w-24 truncate">{d.category}</div>
                        <div className=" w-24 truncate">{d.variant}</div>
                        <div className=" w-24 truncate">{d.quantity} items</div> 
                        <div className=" w-24 truncate">$ {Number(d.totalcost).toFixed(2)}</div>
                    </div>
                    ))
                }
                <div>Total amount : ${amount}</div>
            </div>
        </>
    )
}