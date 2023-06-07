'use client'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartItem } from "@/app/api/cart/route";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { CartContext, CartProvider, CostContext } from "../cartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartItemCard({item}:{item:CartItem}){

    let [stock,setStock]=useState(0);
    const router=useRouter()
    const refresh=useRouter()

    async function getStock(){
        const s=await client.fetch(`*[_type=="BunnyBakery"][0]{categories[categoryName == "${item.category}"][0]{Products[_key=="${item.pkey}"][0]{stock}}}`).then((s:any)=>(setStock(s.categories?.Products.stock)))
        //console.log(s)
    }
    const removeFromCart=async ()=>{
        try{
                const del=await fetch(`/api/cart?key=${item.pkey}`,{
                    cache:'no-cache',
                    method:'DELETE',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({pkey:item.pkey})
                })
                if(quantity>0){
                    
                }
                toast.error('Removed from cart!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                refresh.refresh();
                console.log('refresh?')
                if(!del.ok){console.log('error in del')}
        }catch(err){
            console.log(err)
        }        
    }

    const handleIncrease=async ()=>{
        if(quantity<stock){
            
            try{
                const inc=await fetch('/api/cart',{
                    method:'PUT',
                    body:JSON.stringify({quantity:1,pkey:item.pkey,price:item.price})
                })
               
                setQuantity(quantity+1)
                
                //console.log(inc)
            }catch(err){
                console.log(err)
            }
        }else{
            toast.info('no more stock', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        refresh.refresh()
    }
    const handleDecrease=async ()=>{
        if(quantity>1){
            const dec=await fetch('/api/cart',{
                method:'PUT',
                body:JSON.stringify({quantity:-1,pkey:item.pkey,price:item.price})
            })
           
            setQuantity(quantity-1)
            console.log(dec)
        }else{
            setQuantity(0)
            setQuantity(quantity-1)
            await removeFromCart()
        }
        
    }

    let [quantity,setQuantity]=useState(item.quantity)
    let price=Number((item.price as unknown as number * quantity).toFixed(2))

    
    useEffect(()=>{
        getStock();
        
    },[])
    

    return(
        <div className="flex bg-[#D9D9D9]/30 h-[200px] justify-between p-5">
            <div className=" flex gap-5">
                <Image src='/crossiant.jpg' alt=" " width={150} height={150} />

                {/**Item details */}
                <div className=" flex flex-col w-[200px] justify-between ">
                    <section>
                    <div className=" text-xl md:text-2xl font-medium">{item.productName}</div>
                    <div className=" text-base font-medium">{item.category}</div>
                    </section>
                    <div className=" text-lg font-extrabold">$ {Number((item.price as unknown as number * quantity).toFixed(2))}</div>
                </div>
            </div>

            {/** + - Buttons */}
            <div className=" flex flex-col justify-between items-center">
                <button><Image onClick={removeFromCart} src='/delete.svg' alt=" delete" height={25} width={25} /></button>
                <section className=" flex">
                    <button onClick={handleDecrease} className=" w-5 flex place-self-center justify-center self-center items-center text-center justify-self-end font-bold text-2xl h-5 bg-[#ac1b1b4e] rounded-full">-</button>
                        <div className=" px-1">{quantity}</div>
                    <button onClick={handleIncrease} className=" w-5 flex place-self-center justify-center self-center items-center text-center justify-self-end font-bold text-2xl h-5 bg-[#1fa11f6f] rounded-full">+</button>
                    
                </section>
            </div>
            <ToastContainer/>
        </div>
        
    )
}