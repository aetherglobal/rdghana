import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_category" AS ENUM('blog', 'newsroom', 'media-clippings', 'important-notice');
  CREATE TYPE "public"."enum_company_timeline_side" AS ENUM('left', 'right');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_articles_category" DEFAULT 'blog' NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"featured" boolean DEFAULT false,
  	"cover_id" integer,
  	"excerpt" varchar,
  	"external_href" varchar,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"intro" varchar,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"consent" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"articles_id" integer,
  	"pages_id" integer,
  	"newsletter_subscribers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_dropdowns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean,
  	"description" varchar
  );
  
  CREATE TABLE "site_settings_nav_dropdowns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"icon" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"oristapay_url" varchar,
  	"privacy_policy_url" varchar,
  	"pdpo_notice_url" varchar,
  	"contact_label" varchar,
  	"contact_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_licenses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL
  );
  
  CREATE TABLE "company_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"side" "enum_company_timeline_side" NOT NULL,
  	"year" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "company_management" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "company_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"photo_id" integer,
  	"featured" boolean
  );
  
  CREATE TABLE "company" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"founder_name" varchar,
  	"founder_role" varchar,
  	"founder_photo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_sections_categories_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb
  );
  
  CREATE TABLE "faq_sections_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" varchar,
  	"active_icon" varchar
  );
  
  CREATE TABLE "faq_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vulnerability_disclosure_report_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "vulnerability_disclosure_guidelines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "vulnerability_disclosure" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"security_email" varchar,
  	"pgp_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_dropdowns_links" ADD CONSTRAINT "site_settings_nav_dropdowns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_dropdowns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_dropdowns" ADD CONSTRAINT "site_settings_nav_dropdowns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_licenses" ADD CONSTRAINT "company_licenses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_timeline" ADD CONSTRAINT "company_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_timeline" ADD CONSTRAINT "company_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_management" ADD CONSTRAINT "company_management_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_management" ADD CONSTRAINT "company_management_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_board" ADD CONSTRAINT "company_board_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_board" ADD CONSTRAINT "company_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company" ADD CONSTRAINT "company_founder_photo_id_media_id_fk" FOREIGN KEY ("founder_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_sections_categories_faqs" ADD CONSTRAINT "faq_sections_categories_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_sections_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_sections_categories" ADD CONSTRAINT "faq_sections_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_sections" ADD CONSTRAINT "faq_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_sections_links" ADD CONSTRAINT "terms_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_sections" ADD CONSTRAINT "terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vulnerability_disclosure_report_info" ADD CONSTRAINT "vulnerability_disclosure_report_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vulnerability_disclosure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vulnerability_disclosure_guidelines" ADD CONSTRAINT "vulnerability_disclosure_guidelines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vulnerability_disclosure"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_idx" ON "articles" USING btree ("cover_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_dropdowns_links_order_idx" ON "site_settings_nav_dropdowns_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_dropdowns_links_parent_id_idx" ON "site_settings_nav_dropdowns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_dropdowns_order_idx" ON "site_settings_nav_dropdowns" USING btree ("_order");
  CREATE INDEX "site_settings_nav_dropdowns_parent_id_idx" ON "site_settings_nav_dropdowns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "company_licenses_order_idx" ON "company_licenses" USING btree ("_order");
  CREATE INDEX "company_licenses_parent_id_idx" ON "company_licenses" USING btree ("_parent_id");
  CREATE INDEX "company_timeline_order_idx" ON "company_timeline" USING btree ("_order");
  CREATE INDEX "company_timeline_parent_id_idx" ON "company_timeline" USING btree ("_parent_id");
  CREATE INDEX "company_timeline_image_idx" ON "company_timeline" USING btree ("image_id");
  CREATE INDEX "company_management_order_idx" ON "company_management" USING btree ("_order");
  CREATE INDEX "company_management_parent_id_idx" ON "company_management" USING btree ("_parent_id");
  CREATE INDEX "company_management_photo_idx" ON "company_management" USING btree ("photo_id");
  CREATE INDEX "company_board_order_idx" ON "company_board" USING btree ("_order");
  CREATE INDEX "company_board_parent_id_idx" ON "company_board" USING btree ("_parent_id");
  CREATE INDEX "company_board_photo_idx" ON "company_board" USING btree ("photo_id");
  CREATE INDEX "company_founder_founder_photo_idx" ON "company" USING btree ("founder_photo_id");
  CREATE INDEX "faq_sections_categories_faqs_order_idx" ON "faq_sections_categories_faqs" USING btree ("_order");
  CREATE INDEX "faq_sections_categories_faqs_parent_id_idx" ON "faq_sections_categories_faqs" USING btree ("_parent_id");
  CREATE INDEX "faq_sections_categories_order_idx" ON "faq_sections_categories" USING btree ("_order");
  CREATE INDEX "faq_sections_categories_parent_id_idx" ON "faq_sections_categories" USING btree ("_parent_id");
  CREATE INDEX "faq_sections_order_idx" ON "faq_sections" USING btree ("_order");
  CREATE INDEX "faq_sections_parent_id_idx" ON "faq_sections" USING btree ("_parent_id");
  CREATE INDEX "terms_sections_links_order_idx" ON "terms_sections_links" USING btree ("_order");
  CREATE INDEX "terms_sections_links_parent_id_idx" ON "terms_sections_links" USING btree ("_parent_id");
  CREATE INDEX "terms_sections_order_idx" ON "terms_sections" USING btree ("_order");
  CREATE INDEX "terms_sections_parent_id_idx" ON "terms_sections" USING btree ("_parent_id");
  CREATE INDEX "vulnerability_disclosure_report_info_order_idx" ON "vulnerability_disclosure_report_info" USING btree ("_order");
  CREATE INDEX "vulnerability_disclosure_report_info_parent_id_idx" ON "vulnerability_disclosure_report_info" USING btree ("_parent_id");
  CREATE INDEX "vulnerability_disclosure_guidelines_order_idx" ON "vulnerability_disclosure_guidelines" USING btree ("_order");
  CREATE INDEX "vulnerability_disclosure_guidelines_parent_id_idx" ON "vulnerability_disclosure_guidelines" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav_dropdowns_links" CASCADE;
  DROP TABLE "site_settings_nav_dropdowns" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "company_licenses" CASCADE;
  DROP TABLE "company_timeline" CASCADE;
  DROP TABLE "company_management" CASCADE;
  DROP TABLE "company_board" CASCADE;
  DROP TABLE "company" CASCADE;
  DROP TABLE "faq_sections_categories_faqs" CASCADE;
  DROP TABLE "faq_sections_categories" CASCADE;
  DROP TABLE "faq_sections" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "terms_sections_links" CASCADE;
  DROP TABLE "terms_sections" CASCADE;
  DROP TABLE "terms" CASCADE;
  DROP TABLE "vulnerability_disclosure_report_info" CASCADE;
  DROP TABLE "vulnerability_disclosure_guidelines" CASCADE;
  DROP TABLE "vulnerability_disclosure" CASCADE;
  DROP TYPE "public"."enum_articles_category";
  DROP TYPE "public"."enum_company_timeline_side";`)
}
