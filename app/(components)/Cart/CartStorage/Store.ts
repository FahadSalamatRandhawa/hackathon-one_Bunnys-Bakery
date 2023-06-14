import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

export const CartStore=configureStore({
    reducer:{
        CartSlice,
    }
})

export type RootState=ReturnType<typeof CartStore.getState>;
export type AppDispatch=typeof CartStore.dispatch