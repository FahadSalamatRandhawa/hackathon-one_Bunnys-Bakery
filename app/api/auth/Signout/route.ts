import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server"

export const GET=async(request:NextRequest)=>{
    const response=new NextResponse('Access Token Deleted, Logged out',{
        status:200,
        headers:{
            'content-type':'application/json'
        }
    })
    response.cookies.delete('accessToken')

    return response
}