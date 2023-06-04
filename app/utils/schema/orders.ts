import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { Inter } from "next/font/google";

export const Orders=pgTable('Orders',{
    id:serial('id').primaryKey().notNull(),
    address:varchar('address',{length:150}),
    itemName:varchar('item name'),
    quantity:integer('quantity'),
    price:varchar('price'),
    customerName:varchar('customerName'),
    fulfilled:boolean('fulfilled').notNull().default(false)
})