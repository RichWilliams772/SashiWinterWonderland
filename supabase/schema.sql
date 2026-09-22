-- Run this in the Supabase SQL editor if you are setting up a new project.
-- For an existing project that is missing these tables, run:
-- supabase/migrations/20260922_create_rsvps_and_game_ideas.sql

create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  contact text not null,
  attending text not null,
  dietary text,
  message text,
  constraint rsvps_attending_check check (attending in ('yes', 'no', 'maybe'))
);

create table if not exists public.game_ideas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  idea text not null
);

alter table public.rsvps enable row level security;
alter table public.game_ideas enable row level security;

alter table public.rsvps force row level security;
alter table public.game_ideas force row level security;

revoke all on table public.rsvps from public, anon, authenticated;
revoke all on table public.game_ideas from public, anon, authenticated;

grant all on table public.rsvps to service_role;
grant all on table public.game_ideas to service_role;

-- No public policies. Guests cannot read or write these tables from the browser.
-- The Next.js API routes insert rows with the service role key.
