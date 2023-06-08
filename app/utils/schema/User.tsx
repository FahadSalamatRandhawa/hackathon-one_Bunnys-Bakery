import { pgTable, varchar,boolean } from "drizzle-orm/pg-core";

export const users=pgTable('users',{
    email:varchar('email').primaryKey(),
    secretText:varchar('secrettext').notNull(),
    password:varchar('password').notNull(),
    admin:boolean('admin').default(false)
})