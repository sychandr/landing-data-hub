create extension if not exists pgcrypto;

create table if not exists public.hub_inquiries (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  name text not null,
  email text not null,
  message text not null,
  phone text,
  source_url text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_hub_inquiries_project_id on public.hub_inquiries (project_id);
create index if not exists idx_hub_inquiries_created_at on public.hub_inquiries (created_at);

-- No access without an explicit policy, even via the anon/public API key.
-- The service-role key used by apps/api bypasses RLS entirely, so this only
-- closes off *other* access paths (e.g. if the anon key were ever exposed
-- through Supabase's auto-generated REST API) — costs nothing today since
-- there are no per-user policies yet (auth is coming later).
alter table public.hub_inquiries enable row level security;
