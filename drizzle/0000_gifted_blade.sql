CREATE SCHEMA "synonymSchema";
--> statement-breakpoint
CREATE SCHEMA "termSchema";
--> statement-breakpoint
CREATE SCHEMA "userSchema";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "synonymSchema"."synonyms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"synonym" text NOT NULL,
	"term_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "synonyms_synonym_unique" UNIQUE("synonym")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "termSchema"."definitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"term" text NOT NULL,
	"definition" text NOT NULL,
	"synonyms" text[] DEFAULT ARRAY[]::text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "definitions_term_unique" UNIQUE("term")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSchema"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user" "roles",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sid" varchar,
	"hash" text NOT NULL,
	"salt" text NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "synonymSchema"."synonyms" ADD CONSTRAINT "synonyms_term_id_definitions_id_fk" FOREIGN KEY ("term_id") REFERENCES "termSchema"."definitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
