import { CartItem } from "@/app/utils/schema/CartITem";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartState={
    Products:CartItem[];
    items:number;
    TotalCost:number;
}

const initialState:CartState={
    Products:[],
    items:0,
    TotalCost:0
}

export const CartSlice=createSlice({
    name:'CartSlice',
    initialState,
    reducers:{
        ItemIncrement:(state)=>{
            state.items+=1;
        },
        ItemDecrease:(state)=>{
            state.items-=1;
        },
        ItemAmountIncrement:(state,action:PayloadAction<number>)=>{
            state.items+=action.payload;
        },
        ItemAmountDecrease:(state,action:PayloadAction<number>)=>{
            state.items-=action.payload;
        },
        IncreaseTotalCost:(state,action:PayloadAction<number>)=>{
            state.TotalCost+=action.payload;
        },
        DecreaseTotalCost:(state,action:PayloadAction<number>)=>{
            state.TotalCost-=action.payload;
        },
        AddToCart:(state,action:PayloadAction<any>)=>{
            state.Products.push(action.payload);
            state.items+=action.payload.quantity;
            state.TotalCost+=Number(action.payload.price)*action.payload.quantity;
        },
        ClearCart:(state)=>{
            state.TotalCost=0;
            state.items=0;
            state.Products=[];
        }
    }
})

export const CartAction=CartSlice.actions;
export default CartSlice.reducer;