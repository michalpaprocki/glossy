import { sql } from 'drizzle-orm'
import { text, pgSchema, uuid, timestamp, pgEnum, varchar } from "drizzle-orm/pg-core"

export const userSchema = pgSchema("userSchema")
export const roleEnum = pgEnum('roles', ['user', 'admin'])

export const users = userSchema.table("users", {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').unique().notNull().unique(),
    role: roleEnum("user"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    session: varchar("sid"),
    hash: text('hash').notNull(),
    salt: text('salt').notNull(),

})