import { db } from "@/app/utils/database";
import { users } from "@/app/utils/schema/User";
import { InferModel, and, eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const POST=async(request:NextRequest)=>{
    const req=await request.json()
    const {email}=req;
    const {password}=req;
    console.log(req)
    let user;

    if(email==''||password==''){
        console.log('empty email or passwrd in SigninAPI');
        return NextResponse.json({
            message:'user or email cannot empty',success:false
        },{status:400})
    }

    user=(await db.select().from(users).where(eq(users.email,email)))[0]
    if(!user){
        return NextResponse.json({message:'user not found',exits:false},{
            status:401
        })
    }
    console.log('inside Signin API')
    user=(await db.select().from(users).where(and(eq(users.email,email),eq(users.password,password))))[0]
    if(!user){
        return NextResponse.json({message:'wrong password',success:false},{
            status:401
        })
    }
    const secretText=v4()
    try{
        await db.update(users).set({secretText:secretText})
    }catch(err){
        return NextResponse.json('error in updating SecretText',{status:400})
    }
    let payload={
        email:email
    }
    const accessToken=jwt.sign({
        payload:payload
    },secretText,{
        expiresIn:'6h'
    })

    const response=NextResponse.json({token:accessToken,exists:true,email:user.email})
    response.cookies.set({name:'accessToken',value:accessToken})

    return response
}