import { InferModel } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export type CartItem=InferModel<typeof CartTable>
export const CartTable=pgTable('carttable',{
    user_id:varchar('user_id').notNull(),
    productName:varchar('productname'),
    category:varchar('category').notNull(),
    quantity:integer('quantity').notNull(),
    variant:varchar('variant').notNull(),
    price:varchar('price').notNull(),
    pkey:varchar('pkey').notNull(),
    totalcost:varchar('totalcost').notNull()
})