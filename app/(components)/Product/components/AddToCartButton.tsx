"use client"
import { useContext } from "react"
import { countContext, variantsContext } from "./context";
import { CartProvider,CartContext } from "../../Cart/cartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function AddToCartButton({categoryName,pk,name,price}:{price:string,name:string,categoryName:string,pk:string}){
    const {count,setCount}=useContext(countContext);
    let {variant,setVariant}=useContext(variantsContext);
    let {items,setItems}=useContext(CartContext)
    async function AddToCart(){
        
        try{
            const res=await fetch("/api/cart",{
                method:'POST',
                body:JSON.stringify({
                    category:categoryName,
                    productName:name,
                    quantity:count,
                    variant,
                    price,
                    pkey:pk
                })
            })
            setItems(items+count)
            console.log(items,'toal items')
            console.log(res,'inside add to cart button')
            toast.success('Added to cart!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }catch(err){
            console.log(err,'error')
        }
    }

    return (
        <>
           
                <button onClick={()=>{(count>0?AddToCart():null);}} className=" flex bg-[#C24611]/80 text-white py-1 px-2 font-medium">
                    Add to cart
                </button>
                <ToastContainer />
           
        </>
    )
}