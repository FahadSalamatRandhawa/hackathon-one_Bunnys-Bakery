import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { InferModel, and, eq,gt } from "drizzle-orm"
import { Orders } from "@/app/utils/schema/orders"
import { NextRequest, NextResponse } from "next/server";
import { CartTable } from "@/app/utils/schema/CartITem";
import { v4 } from "uuid";
import { cookies } from "next/headers";

import { db } from "@/app/utils/database";

export type CartItem=InferModel<typeof CartTable>
type NewCartItem=InferModel<typeof CartTable,'insert'>

export const POST=async(request:NextRequest)=>{

    const req=await request.json()
    const myCookies=cookies()

    if(!myCookies.get("user_id")?.value){
        const uuid=v4()
        myCookies.set("user_id",uuid);
        console.log('cookies set')
    }

    const cookiedId=myCookies.get('user_id')?.value as string
    let cart1:NewCartItem={
        category:req.category,
        user_id:cookiedId,
        productName:req.productName,
        quantity:req.quantity,
        variant:req.variant,
        price:req.price,
        pkey:req.pkey,
        totalcost:(req.quantity*Number(req.price)).toFixed(2)
    }

    try{

            const p=await db.select().from(CartTable).where(and(eq(CartTable.user_id,cookiedId),eq(CartTable.pkey,req.pkey))).execute()
            
            if(p.length==0){
                const cart=await db.insert(CartTable).values(cart1).returning();
                console.log('added new')
                return NextResponse.json({message:'Added to cart',data:cart})
            }

            let newQuantity=p[0].quantity+req.quantity;let newTotalCost:string=(newQuantity*Number(req.price)).toFixed(2)
            //p.map((p)=>(count+=p.quantity))
            console.log('logging p in API/Cart/POST')
            //console.log(p)
            const update=await db.update(CartTable).set({quantity:newQuantity,totalcost:newTotalCost}).where(and(eq(CartTable.user_id,cookiedId),eq(CartTable.pkey,req.pkey))).returning()
            console.log('updateed')
            //console.log(update)

            return NextResponse.json({message:'updated existing item in cart',data:update})
            
        }catch(err){
            console.log('erro when adding new')
            return NextResponse.json({message:'error'},{status:400})
        }
}

export const PUT=async (request:NextRequest)=>{
    const req=await request.json()
    const myCookies=cookies()

    if(!myCookies.get("user_id")?.value){
        const uuid=v4()
        myCookies.set("user_id",uuid);
        console.log('cookies set')
    }
    const cookiedId=myCookies.get('user_id')?.value as string
        try{
            const p=await db.select().from(CartTable).where(and(eq(CartTable.user_id,cookiedId),eq(CartTable.pkey,req.pkey))).execute()

            try{
                let count=0;
                p.map((p)=>(count+=p.quantity))
                const update=await db.update(CartTable).set({quantity:count+req.quantity,totalcost:((count+req.quantity*Number(req.price)).toFixed(2)).toString()}).where(and(eq(CartTable.user_id,cookiedId),eq(CartTable.pkey,req.pkey))).execute()
                if(req.quantity>0){
                    console.log('Increased')
                }else{
                    console.log('decreased')
                }
            }catch(err){
                console.log(err);
                return NextResponse.json({message:'error in updating'},{status:400})
                
            }     
        }catch(err){
            console.log(err)
            return NextResponse.json({message:'Could not find'},{status:403})
        }

}

export const GET=async(request:NextRequest)=>{
    const myCookies=cookies();
    const id=myCookies.get("user_id")?.value
    if(!id){
        console.log(id)
        return NextResponse.json({message:'no id found'},{status:401})
    }
    //console.log(id,'in console')
    const b=await db.select().from(CartTable).where(and(eq(CartTable.user_id,id),gt(CartTable.quantity,0)))
    //console.log(b)
    return NextResponse.json({items:b})
}

export const DELETE=async(request:NextRequest)=>{
    
    const myCookies=cookies()
    const cookiedId=myCookies.get('user_id')?.value as string

    const url=request.nextUrl
    const {searchParams}=url
    const key=searchParams.get('key')
    console.log(key,'cart')
    const d=await db.delete(CartTable).where(and(eq(CartTable.pkey,key as string),eq(CartTable.user_id,cookiedId)))
    //console.log(d)

    return NextResponse.json({message:'deleted'})
}