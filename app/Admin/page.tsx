'use client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { useEffect, useState } from "react";
import { OrdersCard } from "./OrdersCard";
import './globals.css'

export type Order={
    id:number,
    items:{name:string,cost:string,quantity:number}[],
    totalcost:string,
    address:string,
    fulfilled:boolean,
}
  
export default function Admin(){
    const [orders,setOrders]=useState<any[]>();
    const [all,setAll]=useState(false);
    const [loading,setLoading]=useState(true)
    const [totalOrders,setTotalOrders]=useState<number>(0);
    const [revenue,setRevenue]=useState<number>(0)

    async function getOrders(){
        try{
            const req=await fetch('/api/Orders',{cache:'no-store'});
            const {orders}:{orders:Order[]}=await req.json();
            setOrders(orders)
            setLoading(false)
            let order_count=0;
            let rev=0;
            orders.map((o:Order)=>{
                order_count+=1;
                o.items.map((i)=>{
                    rev+=Number(i.cost)
                })
            })
            setTotalOrders(totalOrders+1);
            setRevenue(rev)
        }catch(err){
            console.log('error in fetching orders');
            console.log(err)
        }
    }
    console.log('Admin Page.tsx')
    useEffect(()=>{
        getOrders()
    },[])
    return (
        <div className="flex flex-col gap-5 h-screen ">
            <div className="flex self-center">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Orders</MenubarTrigger>
                        <MenubarContent>
                        <MenubarItem onClick={()=>(setAll(!all))} >
                            All <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>Unfulfilled</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Fulfilled</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Disputes</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            {
                loading&&<div>Fetching orders ....</div>
            }
            <div className=" flex justify-around">
                <div className="w-[900px] bg-slate-100/10">
                    <div className="  flex gap-10 font-semibold">
                    <div className="  w-[100px]">ID</div>
                    <div className="  w-[200px]">Items</div>
                    <div className=" w-[100px]">Total Cost</div>
                    <div className=" w-[100px]">Fulfilled</div>
                    <div className=" w-[200px]">Address</div>
                    <div className=" w-[100px]">Delete</div>
                
                    </div>
                {
                    !loading&&orders?.map((o:Order)=>(
                            <OrdersCard key={o.id} o={o}/>
                    ))
                }
                </div>
                <div className="h-auto w-[400px] bg-slate-200/20 items-center ">
                    <div>Overview</div>
                    <div className="flex justify-around ">
                        <div>Total Orders</div>
                        <div>{totalOrders}</div>
                    </div>
                    <div className="flex justify-around ">
                        <div>Revenue</div>
                        <div>$ {revenue}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}