-- Sashi's Wonderland
-- Creates the tables expected by /api/rsvp and /api/game-ideas.
-- Run this in the Supabase SQL Editor. Service role inserts bypass RLS.
-- Do not add public SELECT/INSERT policies. Guest responses stay private.

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

comment on table public.rsvps is
  'Private RSVP submissions from /api/rsvp. Inserted by the Next.js service role only.';
comment on column public.rsvps.full_name is 'Guest full name from the RSVP form.';
comment on column public.rsvps.contact is 'Guest email or phone number.';
comment on column public.rsvps.attending is 'yes | no | maybe';
comment on column public.rsvps.dietary is 'Optional dietary restrictions or allergies.';
comment on column public.rsvps.message is 'Optional message for Sashi.';

comment on table public.game_ideas is
  'Private game-night ideas from /api/game-ideas. Inserted by the Next.js service role only.';
comment on column public.game_ideas.idea is 'Guest game-night suggestion.';

alter table public.rsvps enable row level security;
alter table public.game_ideas enable row level security;

alter table public.rsvps force row level security;
alter table public.game_ideas force row level security;

revoke all on table public.rsvps from public, anon, authenticated;
revoke all on table public.game_ideas from public, anon, authenticated;

grant all on table public.rsvps to service_role;
grant all on table public.game_ideas to service_role;

notify pgrst, 'reload schema';
