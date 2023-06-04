"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useContext } from "react"
import { variantsContext } from "./context"

export function ProductType({variants}:{variants:string[]|null}) {
  let {variant,setVariant}=useContext(variantsContext);

  //console.log(variant)
  return (
    <Select onValueChange={(data)=>(setVariant(data))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Variants" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="simple">Simple</SelectItem>
          {variants?variants.map((variant)=>(<><SelectItem value={variant}>{variant}</SelectItem></>)):null}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
