import { db } from "@/app/utils/database";
import { users } from "@/app/utils/schema/User";
import { InferModel, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const POST=async(request:NextRequest)=>{
    const req=await request.json()
    const {email}=req;
    const {password}=req;
    console.log('inside signup api')
    if(email==''||password==''){
        console.log('empty email or passwrd in SignupAPI');
        return NextResponse.json({
            message:'user or email cannot empty',success:false
        },{status:400})
    }

    const user=(await db.select().from(users).where(eq(users.email,email)))[0]
    if(user){
        return NextResponse.json({message:'User already exists',exists:true})
    }

    const secret=v4();
    const insert=(await db.insert(users).values({email,password,secretText:secret}).returning())[0]
    console.log('user added to db')
    
    return NextResponse.json({message:'user created',success:true,secret:insert.secretText})
}