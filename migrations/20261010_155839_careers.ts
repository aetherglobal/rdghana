import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_job_openings_status" AS ENUM('draft', 'open', 'closed', 'archived');
  CREATE TABLE "job_openings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_job_openings_status" DEFAULT 'draft' NOT NULL,
  	"published_date" timestamp(3) with time zone,
  	"application_deadline" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric DEFAULT 0,
  	"company" varchar DEFAULT 'RD Ghana Limited',
  	"department" varchar,
  	"location" varchar DEFAULT 'Accra, Ghana',
  	"employment_type" varchar,
  	"short_description" varchar,
  	"job_description_pdf_id" integer,
  	"application_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recruitment_email" varchar DEFAULT 'rdghana@aetherstrategies.io' NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "job_openings_id" integer;
  ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_job_description_pdf_id_media_id_fk" FOREIGN KEY ("job_description_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers" ADD CONSTRAINT "careers_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "job_openings_slug_idx" ON "job_openings" USING btree ("slug");
  CREATE INDEX "job_openings_job_description_pdf_idx" ON "job_openings" USING btree ("job_description_pdf_id");
  CREATE INDEX "job_openings_updated_at_idx" ON "job_openings" USING btree ("updated_at");
  CREATE INDEX "job_openings_created_at_idx" ON "job_openings" USING btree ("created_at");
  CREATE INDEX "careers_hero_image_idx" ON "careers" USING btree ("hero_image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_job_openings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_openings_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "job_openings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "job_openings" CASCADE;
  DROP TABLE "careers" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_job_openings_fk";
  
  DROP INDEX "payload_locked_documents_rels_job_openings_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "job_openings_id";
  DROP TYPE "public"."enum_job_openings_status";`)
}
