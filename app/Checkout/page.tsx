"use client"
import Stripe from "stripe";

const stripe=new Stripe(`sk_test_51NFHRIL9ITLbiKbQVq4TaRCe0RFw2CjSRdP7QGY9eYNWsZolMeKAZHI1MXxZcxc3dli3RQGi06YVLz5f2G3BfLkB00owUvy1zV`,{apiVersion:'2022-11-15'})

export default function Checkout(){
    return(
        <div className=" text-center">
            <div className=" text-3xl text-white font-semibold">Checkout</div>
        </div>
    )
}