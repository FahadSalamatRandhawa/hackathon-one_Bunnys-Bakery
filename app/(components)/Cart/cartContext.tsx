'use client'
import { createContext, Dispatch,SetStateAction, useState } from "react";

export const CartContext=createContext<{ items: number; setItems: Dispatch<SetStateAction<number>> }>({ items: 0, setItems: () => {} });
export const CostContext=createContext<{ cost: number; setCost: Dispatch<SetStateAction<number>> }>({ cost: 0, setCost: () => {} });

export const CartProvider=({children}:{children:any})=>{
    let [items,setItems]=useState(0);

    return (
        
        <CartContext.Provider value={{items,setItems}}>
            {children}
        </CartContext.Provider>
        
    )
}


