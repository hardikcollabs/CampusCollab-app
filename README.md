# CampusCollab

CampusCollab is a student-friendly workspace for finding reliable teammates, sharing project opportunities, and coordinating team work.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth + PostgreSQL + Row Level Security
- Vercel-compatible deployment

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create a Supabase project, copy its URL and anon key into `.env.local`, then run `supabase/schema.sql` and `supabase/seed.sql` in the SQL editor. Enable email/password Auth and require email confirmation in Supabase Auth settings.

The UI includes safe demo records when no Supabase environment variables are present, so the interface can be previewed without credentials. Connect the browser client in `src/lib/supabase-browser.ts` as data fetching is wired into each feature.

## Safety and privacy

RLS is enabled on every application table. Profiles intentionally do not contain email or phone fields; email remains in Supabase Auth and is never selected for public UI. Database checks prevent duplicate requests, self-requests, and requests after team capacity is reached. The project creation trigger provides a basic per-user rate limit. Report and block tables are moderation-ready.

This MVP intentionally does not include chat, payments, recommendations, or identity verification. Future additions should use server-side authorization, audit logs, and explicit privacy controls.

## Checks

```bash
npm run lint
npm run build
```
