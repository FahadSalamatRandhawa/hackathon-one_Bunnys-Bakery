"use client"
import { createContext,Dispatch,SetStateAction, useContext, useEffect, useState } from "react";
import CartItemCard from "./components/CartItemCard"
import { CartItem } from "@/app/api/cart/route";
import Link from "next/link";

export default function Cart(){

    let [data, setData] = useState<{items:CartItem[]}>();
    let [cost,setCost]=useState(0)
    let [items,setItems]=useState(0)
    const [loading,setLoading]=useState(true)

    const fetchData = async () => {
        try {
            let totalCost=0;let count=0;
            const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            setData(data);
            setLoading(false)
            data.items.map((d:CartItem)=>{count+=d.quantity;totalCost+=(d.quantity*Number(d.price))})
            setItems(count);
            setCost(totalCost)
            console.log(data)
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchData().then((dataa)=>console.log('data fetched in cart')).catch((err)=>console.log(err,'error in fetching cart'))
    },[])
    
    
    return(
        <>
            <div className=" flex justify-center">

                <div className=" md:w-10/12 flex flex-col m-2 gap-10">
                
                    <text className=" text-4xl font-medium">My Basket</text>
                
                    <div className="flex flex-col gap-[50px] md:flex-row justify-between">
                        <div className=" grid grid-cols-1 md:w-[500px] xl:w-[600px] gap-5">
                        
                                {
                                    loading?<>
                                        <div className=" text-center text-lg">Loading ....</div>
                                    </>:<>
                                    {data&&data.items?(data.items.map((item:CartItem)=>{
                                            return (
                                                <>
                                                
                                                        <CartItemCard item={item} />
                                                    
                                                </>
                                            )
                                        })):<div className=" text-center text-orange-400 text-xl">Basket is empty</div>}
                                    </>
                                }
                        </div>
                        
                            <div className=" grid grid-cols-1 gap-4 md:w-[300px] h-max bg-[#FAF2EB]/50 text-lg font-semibold p-5">
                                <text className=" text-xl font-bold">Order Summary</text>
                                <text className=" flex justify-between"><text>Quantity</text><text>{items}</text></text>
                                <text className=" flex justify-between"><text>Subtotal</text><text className="  font-bold">{cost.toFixed(2)}</text></text>
                                <text className=" flex justify-between text-[#E29118]"><text>Estimated</text><text>2 days</text></text>
                                <button className=" bg-[#C24611]/80 justify-self-center text-white p-2 w-max"><Link href='/Checkout'>Proceed to checkout</Link></button>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}