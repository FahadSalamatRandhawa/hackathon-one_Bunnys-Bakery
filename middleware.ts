import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest){
    const reqestHeaders=new Headers(request.headers)
    const accessToken=request.cookies.get('accessToken')?.value

    console.log('in middleware')

    if(!accessToken){
        const response=new NextResponse('No Access Token',{
            status:401,
            headers:{'content-type':'application/json'}
        })

        response.cookies.delete('accessToken')
        return NextResponse.redirect(new URL('/',request.url))
    }

    try{
        const {verifiedJWT}=await (await fetch(request.nextUrl.origin+'/api/auth/validate',{
            method:'POST',
            body:JSON.stringify({accessToken})
        })).json()
    
        if(!verifiedJWT){
            const response=new NextResponse('Bad Token',{
                status:401,
                headers:{'content-type':'application/json'}
            })
    
            response.cookies.delete('accessToken')
            return NextResponse.redirect(new URL('/',request.url))
        }
    
        reqestHeaders.set('verifiedJWT',verifiedJWT);
    
        const response=NextResponse.next({
            request:{
                headers:reqestHeaders
            }
        });
    console.log('verified JWT in middleware')
        return response;
    }catch(err){
        console.log('err',err)
    }
}

export const config={
    matcher:['/api/Orders','/Admin']
}