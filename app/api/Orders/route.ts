import { Order, Orders } from "@/app/utils/schema/orders";
import { NextRequest, NextResponse } from "next/server";
import { InferModel } from "drizzle-orm";
import { db } from "@/app/utils/database";

export const GET=async()=>{
    try{
      const o=await db.select().from(Orders);
      return NextResponse.json({order:o})
 
    }catch(err){
        return NextResponse.json({error:err})
    }
}