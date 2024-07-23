import { relations, sql } from 'drizzle-orm'
import { text, pgSchema, uuid, timestamp } from "drizzle-orm/pg-core"
import { terms } from './term'


export const synonymSchema = pgSchema("synonymSchema")

export const synonyms = synonymSchema.table("synonyms", {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    synonym: text('synonym').unique().notNull(),
    termId: uuid("term_id").references(()=> terms.id, {onDelete:'cascade'}),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const synonymRelations = relations(synonyms, ({one}) => ({
    
    terms: one(terms, {
        fields: [synonyms.termId],
        references: [terms.id]
    })
}))