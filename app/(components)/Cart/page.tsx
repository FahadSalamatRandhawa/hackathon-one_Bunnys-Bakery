"use client"
import { createContext,Dispatch,SetStateAction, useContext, useEffect, useState } from "react";
import CartItemCard from "./components/CartItemCard"
import { db } from "@/app/utils/database";
import useSwr from 'swr'
import { CartItem } from "@/app/api/cart/route";
import { CartContext, CartProvider, CostContext } from "./cartContext";

export default function Cart(){

    let [data, setData] = useState<{items:CartItem[]}>();
    let [cost,setCost]=useState(0)
    let [items,setItems]=useState(0)
    const [loading,setLoading]=useState(true)

    const fetchData = async () => {
        try {
            const response = await fetch("/api/cart",{method:'GET',cache:'no-cache'});
            const data = await response.json();
            setData(data);
            setLoading(false)
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
                                    {data&&data.items.length>0?(data.items.map((item:CartItem)=>{
                                            return (
                                                <>
                                                <CartContext.Provider value={{items,setItems}}>
                                                    <CostContext.Provider value={{cost,setCost}}>
                                                        <CartItemCard item={item} />
                                                    </CostContext.Provider> 
                                                </CartContext.Provider>
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
                                <button className=" bg-[#C24611]/80 justify-self-center text-white p-2 w-max">Proceed to checkout</button>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}