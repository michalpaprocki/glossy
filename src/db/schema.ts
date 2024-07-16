import { text, pgSchema, uuid } from "drizzle-orm/pg-core"

export const keywordSchema = pgSchema("keywordSchema")

export const keywordSchemaDefinition = keywordSchema.table("definitions", {
    id: uuid('id').primaryKey(),
    keyword: text('keyword').unique().notNull(),
    definition: text('definition').notNull() 
})

