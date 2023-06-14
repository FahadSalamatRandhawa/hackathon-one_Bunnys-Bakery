'use client'
import { useEffect, useState } from "react"
import { Order } from "./page"
import { toast,ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"



export const OrdersCard=({o}:{o:Order})=>{
    const [fulfilled,setFulfilled]=useState(false)
    const router=useRouter()
    console.log(o)

    async function deleteOrder(order_id:number){
        const res=await fetch(`/api/Orders?order_id=${order_id}`,{method:'DELETE'})
        if(!res.ok){
            console.log(await res.json())
            toast.error('Could not delete!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            toast('Deleted!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.refresh()
        }
    }

    useEffect(()=>{
        setFulfilled(o.fulfilled)
    },[])
    console.log('orderCard.tsx')
    return (
        <>
                <div className=" flex gap-10">
                    <div className=" w-[100px]">{o.id}</div>
                    <div className=" w-[200px] ">
                        {o.items.map((item)=>(<div className="  flex gap-4">
                            <div className=" w-3/5">{item.name}</div>
                            <div className=" 1/5">{item.quantity}</div>
                            <div className=" 1/5">{item.cost}</div>
                        </div>))}
                    </div>

                        <div className=" w-[100px]">$ {o.totalcost}</div>
                        <div className="flex w-[100px] items-center justify-center"><div onClick={()=>setFulfilled(!fulfilled)} className={`w-[20px] h-[20px] ${fulfilled?' border-4 border-red-700':'bg-green-500'} rounded-full`}></div></div>
                    <div className=" w-[200px]">{o.address}</div>
                    <div  className=" w-[100px] flex justify-center text-sm"> <ToastContainer/><button onClick={()=>deleteOrder(o.id)} className=" h-max w-max px-1 border-[1px] rounded-md text-red-400 border-red-600 ">Delete</button></div>
                </div>
               
        </>
    )
}