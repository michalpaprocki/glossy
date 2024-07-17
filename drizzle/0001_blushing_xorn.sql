CREATE SCHEMA "termSchema";
--> statement-breakpoint
ALTER SCHEMA "keywordSchema" RENAME TO "synonymSchema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "termSchema"."definitions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"term" text NOT NULL,
	"definition" text NOT NULL,
	"synonymes" text[] DEFAULT ARRAY[]::text[],
	CONSTRAINT "definitions_term_unique" UNIQUE("term")
);
--> statement-breakpoint
ALTER TABLE "synonymSchema"."definitions" RENAME TO "synonyms";--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" DROP CONSTRAINT "definitions_keyword_unique";--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" ADD COLUMN "synonym" text NOT NULL;--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" ADD COLUMN "term_id" uuid;--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" DROP COLUMN IF EXISTS "keyword";--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" DROP COLUMN IF EXISTS "definition";--> statement-breakpoint
ALTER TABLE "synonymSchema"."synonyms" ADD CONSTRAINT "synonyms_synonym_unique" UNIQUE("synonym");