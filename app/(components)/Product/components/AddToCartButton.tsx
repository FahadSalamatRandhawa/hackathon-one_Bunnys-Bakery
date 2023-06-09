"use client"
import { useContext } from "react"
import { countContext, variantsContext } from "./context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { CartAction } from "../../Cart/CartStorage/CartSlice";

export default function AddToCartButton({categoryName,pk,name,price}:{price:string,name:string,categoryName:string,pk:string}){
    const {count,setCount}=useContext(countContext);
    let {variant,setVariant}=useContext(variantsContext);
    const dispatch=useDispatch();
    const refresh=useRouter()
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
            dispatch(CartAction.ItemAmountIncrement(count))
            refresh.refresh()
            console.log('inside add to cart button')
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