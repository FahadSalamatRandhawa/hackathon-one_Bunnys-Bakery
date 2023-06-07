import { Orders } from "@/app/utils/schema/orders";
import { NextResponse } from "next/server";
import { InferModel } from "drizzle-orm";
import { db } from "@/app/utils/database";

type OrderType=InferModel<typeof Orders>

export const GET=async()=>{
    try{
        const dummyOrders:OrderType = 
            {
              id: 1,
              address: '123 Main Street',
              items: JSON.stringify([
                { name: 'Item 1', quantity: 2, price: '10.99', totalAmount: '21.98' },
                { name: 'Item 2', quantity: 1, price: '5.99', totalAmount: '5.99' },
              ]),
              price: '27.97',
              customerName: 'John Doe',
              fulfilled: true,
            }
            
            
          const o=await db.insert(Orders).values(dummyOrders).returning();

          return NextResponse.json({order:o})
    }catch(err){
        return NextResponse.json({error:err},{status:300})
    }
}