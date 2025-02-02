import { sql, relations } from 'drizzle-orm'
import { text, pgSchema, uuid, timestamp } from "drizzle-orm/pg-core"
import { synonyms } from './synonym'

export const termSchema = pgSchema("termSchema")

export const terms = termSchema.table("definitions", {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    term: text('term').unique().notNull(),
    definition: text('definition').notNull(), 
    synonyms: text("synonyms").array().default(sql`ARRAY[]::text[]`),
    createdAt: timestamp("created_at").defaultNow().notNull()
})



export const termRelations = relations(terms, ({many}) => ({
    synonyms: many(synonyms),
}))

