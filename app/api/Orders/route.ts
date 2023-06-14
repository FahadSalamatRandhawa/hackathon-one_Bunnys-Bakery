import { Order, Orders } from "@/app/utils/schema/orders";
import { NextRequest, NextResponse } from "next/server";
import { InferModel } from "drizzle-orm";
import { db } from "@/app/utils/database";
import { sql } from "@vercel/postgres";

export const GET=async()=>{
  console.log('reached GET ORDERS')
    try{
      const ordersTable= (await sql.query(`CREATE TABLE IF NOT EXISTS ORDERS(id SERIAL NOT NULL  PRIMARY KEY,items JSON[],totalcost varchar(10),address varchar(255),fulfilled boolean DEFAULT FALSE);`)).rows
      const orders=(await sql.query('SELECT * FROM orders')).rows;
      console.log('orders in server');
     // console.log(orders)
      return NextResponse.json({orders})
 
    }catch(err){
      console.log('error in Api/Orders GET')
      console.log(err)
        return NextResponse.json({error:err})
    }
}

export const DELETE=async(request:NextRequest)=>{
  try{
    const url=request.nextUrl
    const {searchParams}=url
    const order_id=searchParams.get('order_id')
    const del=await sql.query(`DELETE from orders WHERE id=${order_id}`);

    return NextResponse.json({message:'order deleted',success:true});
  }catch(err){
    return NextResponse.json({message:'error in DELTE Order',success:false},{status:400})
  }
}