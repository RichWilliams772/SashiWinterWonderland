-- Run this in the Supabase SQL editor if you are setting up a new project.
-- RSVP submissions use public.rsvps. The game_ideas and playlist_songs
-- tables may already exist from earlier versions and can remain unused.

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

create table if not exists public.playlist_songs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  song_title text not null,
  artist text not null,
  submitted_by text,
  music_url text,
  title_key text generated always as (lower(btrim(song_title))) stored,
  artist_key text generated always as (lower(btrim(artist))) stored,
  constraint playlist_songs_title_len check (char_length(btrim(song_title)) between 1 and 120),
  constraint playlist_songs_artist_len check (char_length(btrim(artist)) between 1 and 80),
  constraint playlist_songs_unique_song unique (title_key, artist_key)
);

alter table public.playlist_songs enable row level security;
alter table public.playlist_songs force row level security;
revoke all on table public.playlist_songs from public, anon, authenticated;
grant all on table public.playlist_songs to service_role;

-- No public policies. Guests cannot read or write these tables from the browser.
-- The Next.js API routes insert rows with the service role key.
