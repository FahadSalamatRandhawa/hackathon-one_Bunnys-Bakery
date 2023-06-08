import { db } from "@/app/utils/database";
import { users } from "@/app/utils/schema/User";
import { InferModel, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

type user=InferModel<typeof users,'select'>
type userI=InferModel<typeof users,'insert'>
export const POST=async(request:NextRequest)=>{
    const req=await request.json()
    const {email}=req;
    const {password}=req;

    const user=(await db.select().from(users).where(eq(users.email,email)))[0]
    if(user){
        return NextResponse.json({message:'User already exists',exists:true},{status:401})
    }

    const secret=v4();
    const insert=(await db.insert(users).values({email,password,secretText:secret}).returning())[0]
    
    return NextResponse.json({message:'user created',success:true,secret:insert.secretText})
}