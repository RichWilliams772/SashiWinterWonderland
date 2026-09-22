-- Run this in the Supabase SQL editor before deploying RSVPs.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  contact text not null,
  attending text not null check (attending in ('yes', 'no', 'maybe')),
  dietary text,
  message text
);

alter table public.rsvps enable row level security;

create table if not exists public.game_ideas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  idea text not null
);

alter table public.game_ideas enable row level security;

-- No public policies. Guests cannot read the list.
-- The Next.js API routes insert rows with the service role key.
