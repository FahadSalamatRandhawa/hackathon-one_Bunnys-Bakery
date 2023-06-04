"use client"
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import PlusMinusButton from "./PlusMinusButton";
import { ProductType } from "./ProductType";
import { IFullProduct } from "../../[categoryName]/[Product]/page";
import { countContext,variantsContext } from "./context";
import { CartProvider } from "../../Cart/cartContext";

export default function Filter({categoryName,Product}:{categoryName:string,Product:IFullProduct}){
    //console.log(Product)

    let [count,setCount]=useState(0);
    let [variant,setVariant]=useState('');
    
    return(
        <>
            <div className="flex flex-col px-10  md:w-[600px] gap-10 md:gap-16 py-10">
                        <div className=" font-bold text-xl">
                            <div>{Product.name}</div>
                            <text className=" opacity-70">{categoryName}</text>
                        </div>
                        <variantsContext.Provider value={{variant,setVariant}}>
                            <ProductType variants={Product.variants} />
                        </variantsContext.Provider>
                        <div className=" flex flex-col gap-10">
                            <div className=" flex flex-row w-[200px] justify-between text-lg font-semibold">
                                <div>Quantity</div>
                                <div className=" flex">
                                    <countContext.Provider value={{count,setCount}}>
                                        <PlusMinusButton key={Product._key} pk={Product._key} categoryName={categoryName} />
                                    </countContext.Provider>
                                </div>
                            </div>
                            <div className=" flex flex-row w-[200px] justify-between text-lg font-semibold">
                            
                                    <variantsContext.Provider value={{variant,setVariant}}>
                                        <countContext.Provider value={{count,setCount}}>
                                            <AddToCartButton key={Product._key} pk={Product._key} categoryName={categoryName} name={Product.name} price={Product.price as unknown as string} />
                                              </countContext.Provider>
                                    </variantsContext.Provider>
                            
                                <div className=" font-bold">$ {Product.price}</div>
                            </div>
                        </div>
                    </div>
        </>
    )
}