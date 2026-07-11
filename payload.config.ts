import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Articles } from "./collections/Articles";
import { Pages } from "./collections/Pages";
import { NewsletterSubscribers } from "./collections/NewsletterSubscribers";
import { SiteSettings } from "./globals/SiteSettings";
import { Company } from "./globals/Company";
import { Faq } from "./globals/Faq";
import { Terms } from "./globals/Terms";
import { VulnerabilityDisclosure } from "./globals/VulnerabilityDisclosure";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Media storage: use an S3-compatible bucket (AWS S3, Cloudflare R2, MinIO, …)
// when credentials are present; otherwise fall back to local disk so dev works
// without cloud setup. Files are still served through Payload's own
// `/api/media/file/...` route (same-origin), so next/image needs no changes.
const S3_BUCKET = process.env.S3_BUCKET;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const s3Enabled = Boolean(S3_BUCKET && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY);

// Drizzle `push` (schema auto-sync) is a local-development convenience only.
// Vercel builds run with NODE_ENV=production, so staging + production are driven
// by the committed migrations in ./migrations instead.
const dbPush = process.env.NODE_ENV !== "production";

// SSL: Neon validates against the public trust store via the connection string's
// sslmode. Amazon RDS presents a CA that isn't in Node's default store — supply that
// CA as inline PEM text in DATABASE_CA (a file path won't work: serverless file
// tracing can't follow it), or set DATABASE_SSL_NO_VERIFY=true to skip verification.
const dbCa = process.env.DATABASE_CA || undefined;
const dbSsl = dbCa
  ? { ca: dbCa }
  : process.env.DATABASE_SSL_NO_VERIFY === "true"
    ? { rejectUnauthorized: false }
    : undefined;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Articles, Pages, NewsletterSubscribers],
  globals: [SiteSettings, Company, Faq, Terms, VulnerabilityDisclosure],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      max: Number(process.env.DATABASE_POOL_MAX) || 5,
      ...(dbSsl ? { ssl: dbSsl } : {}),
    },
    push: dbPush,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: s3Enabled
    ? [
        s3Storage({
          collections: { media: true },
          bucket: S3_BUCKET ?? "",
          config: {
            endpoint: process.env.S3_ENDPOINT || undefined,
            // R2/MinIO: "auto"; AWS: set S3_REGION to the bucket's region.
            region: process.env.S3_REGION || "auto",
            credentials: {
              accessKeyId: S3_ACCESS_KEY_ID ?? "",
              secretAccessKey: S3_SECRET_ACCESS_KEY ?? "",
            },
            // Required for R2/MinIO; AWS S3 tolerates path-style too.
            forcePathStyle: true,
          },
        }),
      ]
    : [],
  sharp,
});
