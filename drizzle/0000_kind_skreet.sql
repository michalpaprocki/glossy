CREATE SCHEMA "keywordSchema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keywordSchema"."definitions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"keyword" text NOT NULL,
	"definition" text NOT NULL,
	CONSTRAINT "definitions_keyword_unique" UNIQUE("keyword")
);
