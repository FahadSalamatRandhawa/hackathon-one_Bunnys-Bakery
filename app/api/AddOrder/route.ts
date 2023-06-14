import { NextRequest,NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const POST=async(request:NextRequest)=>{
    const req=await request.json()

    console.log('insider Add orders')
    //console.log(req)
    const itemsArray=req.items;
    let totalCost:number=0;
    let itemInsertQuery:string='';
    itemsArray.map((i:any)=>{
      itemInsertQuery+=`'{"name":"${i.productName}","quantity":"${i.quantity}","cost":"${i.totalcost}","pkey":"${i.pkey}"}'::json,`
      totalCost+=Number(Number(i.totalcost).toFixed(2))
    })
    console.log(itemInsertQuery)
    try{
      const query=`INSERT INTO ORDERS (items, totalcost, Address)
      VALUES(ARRAY[${itemInsertQuery.slice(0,-1)}],'${totalCost}','Address if here');
      `
      console.log(query)
      const dbOrder=await sql.query(query)
      console.log('order inserted ok')
      console.log(dbOrder)
    }catch(err){
      console.log('err in post order')
      return NextResponse.json({message:'order not inserted',error:err},{status:400})
    }
  
    return NextResponse.json('order inserted')
  }