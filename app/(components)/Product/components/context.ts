"use client"
import { createContext,Dispatch, SetStateAction } from "react"

export const countContext=createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({ count: 0, setCount: () => {} });
export const variantsContext=createContext<{ variant: string; setVariant: Dispatch<SetStateAction<string>> }>({ variant: '', setVariant: () => {} });