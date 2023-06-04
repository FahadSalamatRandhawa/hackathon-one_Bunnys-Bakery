"use client"

//import useSWR from 'swr'
import { useContext, useState } from "react"
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { countContext } from './context';


export default function PlusMinusButton({categoryName,pk}:{categoryName:string,pk:string}){
    const {count,setCount}=useContext(countContext);
    //console.log(categoryName,pk)
    let [stock,setStock]=useState(0);

    client.fetch(`*[_type=="BunnyBakery"][0]{categories[categoryName == "${categoryName}"][0]{Products[_key=="${pk}"][0]{stock}}}`).then((s)=>(setStock(s.categories?.Products.stock)))
    
    //const {refresh}=useRouter();
    return (
        <>
            <button onClick={()=>{(count>0?(setCount(count-1)):null)}} className=" w-5 flex place-self-center justify-center self-center items-center text-center justify-self-end font-bold text-2xl h-5 bg-[#ac1b1b4e] rounded-full">-</button>
            <div className=" px-1">{count}</div>
            <button onClick={()=>{(stock&&count<stock)?setCount(count+1):null}} className=" w-5 flex place-self-center justify-center self-center items-center text-center justify-self-end font-bold text-2xl h-5 bg-[#1fa11f6f] rounded-full">+</button>
        </>
        
    )
}

