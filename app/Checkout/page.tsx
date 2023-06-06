'use client'
import Stripe from "stripe";
import Items from "./Items";
import Payment from "./Payment";

//const stripe=new Stripe(``,{apiVersion:'2022-11-15'})

export default function Checkout(){
    return(
        <div className=" mt-10 flex flex-row justify-around text-center">
           <Items/>
           <Payment/>
        </div>
    )
}