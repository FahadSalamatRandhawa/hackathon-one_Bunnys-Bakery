"use client"
import { useEffect,useState } from "react"
import {loadStripe} from '@stripe/stripe-js'
import Stripe from "stripe"
import { SetStateAction } from "react";

type stripeType=typeof Stripe;
export default function Payment(){
    const [stripe,setStripe]=useState<any>()
    useEffect(()=>{
        const publichKey=process.env.STRIPE_PUBLISH_KEY;
        setStripe(loadStripe(publichKey as string))
        console.log(stripe)
    },[])

    return(
        <div>

        </div>
    )
}