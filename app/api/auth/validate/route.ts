import { db } from "@/app/utils/database";
import { users } from "@/app/utils/schema/User";
import { eq } from "drizzle-orm";
import { decode, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    const {accessToken}:{accessToken:string}=await request.json()
    const decodedToken:any=decode(accessToken);

    if(!decodedToken){
        return new NextResponse('Bad token',{
            status:401
        })
    }

    if(decodedToken && typeof decodedToken === 'object' && decodedToken.exp){
        const expirationTimestamp = decodedToken.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if( expirationTimestamp < currentTimestamp){
            console.log('jwt expired')
            return new NextResponse('Expired JWT',{status:401})
        }
    }

    const user=(await db.select().from(users).where(eq(users.email,decodedToken.payload.email)))[0]

    if(!user.secretText){
        return new NextResponse('user with this secretText not found',{status:401})
    }

    const verifiedJWT=verify(accessToken,user.secretText);
    console.log('jwt verified')

    return NextResponse.json({verifiedJWT})
}