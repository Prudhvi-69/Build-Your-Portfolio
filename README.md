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

## Checks

```bash
npm run lint
npm run build
```
