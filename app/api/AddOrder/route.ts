import { NextRequest,NextResponse } from "next/server";
import { CartItem } from "../Stripe/route";
import { db } from "@/app/utils/database";
import { OrderI, Orders } from "@/app/utils/schema/orders";
import { sql } from "@vercel/postgres";

export const POST=async(request:NextRequest)=>{
    const req=await request.json()
    const myItem:OrderI=req

    console.log('insider post orders')
    console.log(myItem)
    
    try{
      const dbOrder=await sql.query(`INSERT INTO Orders (id, items, price, quantity, customername, fulfilled)
      VALUES(DEFAULT,'${myItem.items}', '${myItem.price}', ${myItem.quantity}, ${myItem.customerName},DEFAULT);
      `)
      console.log(dbOrder)
    }catch(err){
      console.log('err in post order')
      return NextResponse.json({message:'order not inserted',error:err},{status:400})
    }
  
    return NextResponse.json('order inserted')
  }