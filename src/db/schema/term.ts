import { sql, relations } from 'drizzle-orm'
import { text, pgSchema, uuid } from "drizzle-orm/pg-core"
import { synonyms } from './synonym'

export const termSchema = pgSchema("termSchema")

export const terms = termSchema.table("definitions", {
    id: uuid('id').primaryKey(),
    term: text('term').unique().notNull(),
    definition: text('definition').notNull(), 
    synonymes: text("synonymes").array().default(sql`ARRAY[]::text[]`)
})


export const termRelations = relations(terms, ({many}) => ({
    synonyms: many(synonyms)
}))

