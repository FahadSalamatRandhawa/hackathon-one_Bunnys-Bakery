import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { CartTable } from "@/app/utils/schema/CartITem"
import { db } from "@/app/utils/database"
import { InferModel, and, eq } from "drizzle-orm"
import { gt } from "drizzle-orm"

export type CartItem=InferModel<typeof CartTable>

export const GET=async()=>{
    return NextResponse.json({publishkey:process.env.STRIPE_PUBLISH_KEY})
}

export const POST=async(request:NextRequest)=>{
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{apiVersion:'2022-11-15'})
    const myCookies=cookies();
    const id=myCookies.get('user_id')?.value;
    if(!id){
        return NextResponse.json({message:'no matching id found',Code:'Un-Authorized'},{
            status:401
        })
    }
    try{

        const b=await db.select().from(CartTable).where(and(eq(CartTable.user_id,id as string),gt(CartTable.quantity,0)))
        let amount=0;
        b.map((i)=>(amount+=Number((i.quantity*Number(i.price)))))
        const TotalAmount=Math.round(amount);
        console.log(TotalAmount)
        
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: TotalAmount,
                currency: 'eur',
                automatic_payment_methods: {enabled: true},
              })
              console.log('payment intent created')
              return NextResponse.json({clientSecret:paymentIntent.client_secret},{status:200})
        }catch(err){
            return NextResponse.json({message:'could not generate payment intent'},{status:407})
        }
    }catch(err){
        return NextResponse.json({message:'Could not get cart items'},{status:403})
    }
}