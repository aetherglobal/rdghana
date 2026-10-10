import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id");`)

  const s = await payload.findGlobal({ slug: 'site-settings', depth: 0, req })
  const navDropdowns = (s.navDropdowns ?? []).map((d) => ({
    ...d,
    links: (d.links ?? []).filter((l) => !l.href.startsWith('/careers')),
  }))
  const navLinks = (s.navLinks ?? []).some((l) => l.href.startsWith('/careers'))
    ? s.navLinks
    : [...(s.navLinks ?? []), { label: 'Careers', href: '/careers' }]
  await payload.updateGlobal({ slug: 'site-settings', data: { navDropdowns, navLinks }, req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_nav_links" CASCADE;`)
}
