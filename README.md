# TasteSpace

TasteSpace is a full-stack monolithic web application that blends modern cloud-native engineering with nostalgic, community-driven social features. Built as a portfolio flagship, TasteSpace goes beyond simple CRUD by implementing patterns such as AI-driven scraping pipelines, native database full-text search, append-only event ledgers for version control, and asynchronous message queues.

Inspired by retro social networks (e.g., MySpace) and powered by a 2026 tech stack, TasteSpace helps home chefs curate culinary identities, scale formulas, collaborate on collections, and index recipes from social media.

---

## Technology stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** TypeScript (strict type safety across client and server boundaries)
- **Database:** Neon PostgreSQL (serverless, cloud-native, distributed connection pooling)
- **ORM:** Drizzle ORM (code-first TypeScript SQL query builder & type inference)
- **Authentication & sessions:** Better Auth (stateful database sessions)
- **Styling:** Tailwind CSS + shadcn/ui (accessible headless primitives)
- **Async task queue:** Upstash / Inngest (serverless message distribution)
- **Asset storage:** Cloudinary / AWS S3
- **Offline PWA engine:** Workbox + IndexedDB
- **Testing:** Vitest (unit/integration) + Playwright (E2E)

---

## Key features & architecture

### 1. Core platform & curation (MVP)
- **Unified stateful authentication:** Uses Better Auth with a stateful session model. Supports credentials (email/password) and OAuth (Google, GitHub) mapped to a `user` schema with client-side helpers like `useSession()`.
- **Dynamic recipe CRUD & privacy engine:** Multi-step recipe forms with an `is_public` toggle. Backend route guards enforce visibility rules.
- **Thematic cookbook curation:** Many-to-many `cookbook_recipes` join table to group recipes into collections.
- **Server-rendered global feed:** Server Components fetch data directly from Neon for fast initial loads and good SEO.

### 2. Intelligent query engines & AI utilities
- **AI social media importer:** Uses the Vercel AI SDK and LLMs (e.g., `gpt-4o-mini`, `claude-3-haiku`) to parse social links into validated recipe objects.
- **Structured JSONB ingredients:** Ingredients stored as JSONB: `{ amount: number, unit: string, name: string }` for a single source of truth.
- **Scalar yield multiplier:** Client-side engine that reactively rescales ingredient quantities without server refetches.
- **Postgres full-text search (FTS):** `to_tsvector` / `to_tsquery` with multi-column GIN indexes across title, description, and tags.
- **"What's in my fridge?" matcher:** Uses Postgres array containment (`@>`) to find recipes that match on-hand ingredients.
- **Generative AI fallback:** If no matches are found, an LLM fallback can generate a recipe based on the provided ingredients.
- **Grocery list aggregator:** Consolidates ingredient quantities across selected recipes using regex parsing and math logic.

### 3. Nostalgic social mechanics & versioning
- **"Top 5" showcase:** A user profile carousel limited to five active slots, enforced by transactional Server Actions.
- **Social recipe forking:** Deep cloning of public recipes with immutable attribution back to the original author.
- **Recipe version control ("Git for Food"):** Append-only `recipe_history` ledger capturing snapshots for visual diffs.
- **Collaborative cookbooks:** RBAC via `cookbook_members` join table (Owner / Editor / Viewer) with server-side validation.

### 4. DevOps & scaling
- **Analytics dashboard:** Append-only interaction ledger and materialized views for pre-aggregated metrics.
- **Global activity ledger:** Chronological timeline with cursor-based pagination for efficiency.
- **Asynchronous webhooks & queues:** Upstash / Inngest handle background notifications and social events.
- **PWA offline mode:** Service Workers (Workbox) + IndexedDB to support offline cookbook access.

---

## Repository layout

The project keeps concerns separated between presentation, business logic, and database migrations:

```
tastespace/
├── app/                 # Next.js App Router
│   ├── api/
│   │   └── auth/[...all]/  # Better Auth catch-all
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/
│   └── page.tsx
├── components/         # UI components and providers
├── db/
│   ├── drizzle.ts
│   └── schema.ts
├── lib/                # Business logic and server actions
├── migrations/         # Drizzle migrations (SQL)
├── public/
├── tests/              # Vitest + Playwright suites
├── package.json
└── tsconfig.json
```

## Strategic implementation roadmap (high level)

The architecture is developed in four phases to keep a working build at each milestone:

### Phase 1 — Core foundation & tests
- Infrastructure: provision Neon, scaffold Next.js 15 with TypeScript, and set up Vitest.
- Database: author schemas under `db/schema/` and manage migrations with Drizzle Kit.
- Authentication: implement `lib/auth.ts` and `lib/auth-client.ts`, and wrap the root layout with session providers.
- CRUD & tests: implement Server Actions for recipes and co-locate integration tests.
- Yield multiplier unit tests for JSONB ingredient transformations.

### Phase 2 — AI & search
- Implement the social link parser with the Vercel AI SDK and add integration tests.
- Configure Postgres FTS indexes and server-side search functions.
- Implement fridge containment queries and an LLM fallback generator.

### Phase 3 — Social mechanics & E2E
- Build cookbook associations and transactional Top 5 logic.
- Implement forking flows and record snapshots in `recipe_history`.
- Add Playwright multi-session E2E tests to exercise social flows.

### Phase 4 — Scaling & resilience
- Implement RBAC for shared cookbooks and hardened security tests.
- Add materialized views for analytics and optimize cursor pagination.
- Wire background queuing (Upstash / Inngest) and finalize PWA offline behavior.

## Testing & verification

Run unit and integration tests (Vitest):

```bash
npm run test:unit
```

Run end-to-end tests (Playwright):

```bash
npx playwright test
```
