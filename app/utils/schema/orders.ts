import { boolean, customType, integer, jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { Inter } from "next/font/google";

type ordersType={
    name:string,
    quantity:number,
    price:string,
    totalAmount:string
}

export const Orders=pgTable('Orders',{
    id:serial('id').primaryKey().notNull(),
    address:varchar('address',{length:150}),
    items:text('items[]'),
    price:varchar('price'),
    customerName:varchar('customerName'),
    fulfilled:boolean('fulfilled').notNull().default(false),

})