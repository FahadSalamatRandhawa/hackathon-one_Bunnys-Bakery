import { InferModel } from "drizzle-orm";
import { boolean, customType, integer, jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { Inter } from "next/font/google";

export type Order=InferModel<typeof Orders>
export type OrderI=InferModel<typeof Orders,'insert'>
export const Orders=pgTable('Orders',{
    id:serial('id').primaryKey().notNull(),
    items:varchar('items'),
    price:varchar('price'),
    quantity:integer('quantity').notNull(),
    customerName:varchar('customerName'),
    fulfilled:boolean('fulfilled').default(false),
})