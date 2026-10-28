# Profolion

Profolion helps you make a personal portfolio for your projects, experience, skills, and links — no code or credit card required.

## Get started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the app.

## Configure Supabase

Create a Supabase project and copy its project URL and anon key into `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Apply the schema in [`supabase/schema.sql`](./supabase/schema.sql) to the project database. Keep `.env.local` private; `.env.example` documents the variables without containing credentials.

If the Supabase database was configured before the profile-creation fix, also run [`supabase/migrations/20261028_fix_profile_creation.sql`](./supabase/migrations/20261028_fix_profile_creation.sql) in the Supabase SQL Editor. This allows a signed-in user to create or update their own profile, which is required before creating a portfolio.

## Checks

```bash
npm run lint
npm run build
```
