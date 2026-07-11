# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`rd-technologies` — a Next.js 16 (App Router) + React 19 web app, freshly bootstrapped from `create-next-app`. Aside from a couple of opt-in features noted below, `app/page.tsx` is still the starter template.

## Commands

**Use Bun exclusively — for install, scripts, and running binaries. Do not use npm, pnpm, yarn, `npx`, or `node` directly.** The lockfile is `bun.lock`; `package.json` relies on Bun-specific `trustedDependencies`/`ignoreScripts`. Never generate or commit `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.

**One documented exception (Payload CLI):** the `payload` binary (`generate:types`, `generate:importmap`, `migrate`) has a known failure under the Bun *runtime* (tsx resolution, payload#15015). Run those `payload …` scripts under **Node** if Bun fails. Everything else — `bun install`, `bun add`, `bun dev`, `bun run build`, `bun start`, `bun run lint` — stays on Bun. Note the `payload` CLI works fine under Bun since the project is ESM (`"type": "module"`); `bun run generate:types` runs cleanly.

```bash
bun install                    # install deps
bun install --frozen-lockfile  # CI / reproducible installs (fail if bun.lock is stale)
bun add <pkg>                  # add a dependency
bun add -d <pkg>               # add a dev dependency (never install tools globally)
bun remove <pkg>               # remove a dependency
bun dev                        # dev server at http://localhost:3000 (Turbopack)
bun run build                  # production build
bun start                      # serve production build
bun run lint                   # ESLint (flat config)
bunx <tool>                    # run a package binary (use instead of npx)
```

No test runner is configured yet — there is no `test` script and no test framework in the dependency tree.

## Key setup choices (non-obvious)

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` installed). Do **not** add manual `useMemo`/`useCallback`/`React.memo` for performance — the compiler handles memoization. Follow the Rules of React so the compiler can optimize (pure render, no mutation of props/state during render).
- **Tailwind CSS v4, CSS-first.** There is no `tailwind.config.js`. Theme tokens (colors, fonts) are defined in `app/globals.css` via `@import "tailwindcss"` and the `@theme inline { ... }` block. Edit that file to change design tokens; wiring is through `@tailwindcss/postcss` in `postcss.config.mjs`.
- **Path alias:** `@/*` maps to the repo root (`tsconfig.json`), e.g. `import x from "@/app/..."`.
- **TypeScript: strict mode is on — write to it.** `strict: true`, target ES2017, `noEmit` (Next handles the build). Conventions:
  - Never use `any`. Use `unknown` + a type guard, or a precise type. Let inference work for locals; add **explicit return types on exported/public functions**.
  - `interface` for object/prop shapes and public contracts; `type` for unions, intersections, and utility/mapped types. Model variant state with **discriminated unions**, not optional-field grab-bags.
  - Prefer built-in utility types (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `NonNullable`) over hand-rolled equivalents. Use `?.` / `??` for nullable access; treat indexed access as possibly `undefined`.
  - Never suppress errors with `@ts-ignore`/`@ts-expect-error` or `as any` casts to make something compile — fix the type. `as` is only for genuinely justified narrowing.
  - *Recommended tightening (not yet enabled in `tsconfig.json`):* `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`.
- Fonts (`Geist`, `Geist_Mono`) load via `next/font/google` in `app/layout.tsx` and are exposed as the `--font-sans` / `--font-mono` CSS variables consumed by the Tailwind theme.

## Payload CMS

Content is managed by **Payload CMS 3.x embedded in this same Next.js app** (no separate service). The app is therefore **full-stack** and requires a database to run.

- **Env (required):** `DATABASE_URI` (Postgres connection string — **differs per environment**, see **Database** below) and `PAYLOAD_SECRET`. See `.env.example`. The app will not boot without these.
- **Admin panel:** `http://localhost:3000/admin`. Auto-generated REST at `/api/*`, GraphQL at `/api/graphql`.
- **Config:** `payload.config.ts` at the repo root (aliased `@payload-config`). Collections in `collections/`, globals in `globals/`. `next.config.ts` is wrapped with `withPayload`.
- **Database:** Postgres via `@payloadcms/db-postgres` (Drizzle), **one database per environment** — **production:** AWS RDS behind RDS Proxy (deployed from `main`); **staging:** Neon (deployed from `staging`); **local dev:** a dedicated Neon branch. Drizzle `push` (schema auto-sync) is gated to local dev only (`NODE_ENV !== "production"` in `payload.config.ts`); staging + production apply committed migrations from `migrations/`. Migrations run **at build time** via the `vercel-build` script (`payload migrate` when `VERCEL_ENV=production` or the branch is `staging`) — not at runtime (avoids serverless cold-start cost). SSL: RDS needs its CA via `DATABASE_CA` (PEM) or `DATABASE_SSL_NO_VERIFY=true`; Neon uses the connection string's `sslmode`. Optional `DATABASE_POOL_MAX` caps the per-instance pool (default 5).
- **Media storage:** local disk (`media/`, git-ignored) by default. Set the `S3_*` env vars (see `.env.example`) to switch to an S3-compatible bucket (AWS S3 / Cloudflare R2 / MinIO) via `@payloadcms/storage-s3` — required for serverless deploys, where local disk doesn't persist. Files serve through Payload's `/api/media/file/...` route either way, so next/image is unaffected. The adapter auto-enables when `S3_BUCKET` + `S3_ACCESS_KEY_ID` + `S3_SECRET_ACCESS_KEY` are all set (`payload.config.ts`).
- **Rich text:** Lexical. Article/page bodies are `SerializedEditorState`; render with `<RichText>` (see `components/sections/rich-text.tsx`), edit in the admin.
- **Generated types:** `payload-types.ts` is **git-ignored and regenerated**, not committed. `bun run build` regenerates it first (so CI/deploys always get fresh types); run `bun run generate:types` manually after cloning or whenever a collection/global changes. That script also strips all JSDoc comments from the generated file (via `scripts/clean-payload-types.ts`) — field descriptions still live in the collection/global configs for the admin UI, they're just omitted from the types. Do not hand-edit the file.
- **Data access:** public pages (RSC) read via the Local API (`getPayloadClient()` in `lib/payload.ts`) — no HTTP hop.

## Structure

App Router lives at the repo root under `app/` with two **root-level route groups**: `app/(frontend)/` holds the public site (its `layout.tsx` renders `<html>` + fonts + `SiteHeader`/`SiteFooter` + `globals.css`), and `app/(payload)/` holds Payload's admin + API (generated files — do not edit). There is **no top-level `app/layout.tsx`** (each group is its own root layout — required so site chrome doesn't leak into `/admin`). `favicon.ico`/`icon.png` stay at `app/` root. Static assets in `public/`; uploaded CMS media in `media/` (git-ignored). No `src/` directory.
