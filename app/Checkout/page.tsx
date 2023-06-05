"use client"
import Stripe from "stripe";

//const stripe=new Stripe(``,{apiVersion:'2022-11-15'})

export default function Checkout(){
    return(
        <div className=" text-center">
            <div className=" text-3xl text-white font-semibold">We only accept cash on delivery</div>
        </div>
    )
}