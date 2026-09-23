-- Sashi's Wonderland
-- Creates public.playlist_songs for /api/playlist-songs.
-- Run this in the Supabase SQL Editor. Do not disable RLS.
-- Guests never query this table from the browser.

create extension if not exists pgcrypto;

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
  constraint playlist_songs_name_len check (
    submitted_by is null or char_length(btrim(submitted_by)) <= 80
  ),
  constraint playlist_songs_url_https check (
    music_url is null
    or music_url ~* '^https://(open\.spotify\.com|spotify\.link|www\.spotify\.com|music\.apple\.com|itunes\.apple\.com|geo\.music\.apple\.com)/'
  ),
  constraint playlist_songs_unique_song unique (title_key, artist_key)
);

comment on table public.playlist_songs is
  'Guest song requests from /api/playlist-songs. Inserted and read by the Next.js service role only.';
comment on column public.playlist_songs.song_title is 'Required song title.';
comment on column public.playlist_songs.artist is 'Required artist name.';
comment on column public.playlist_songs.submitted_by is 'Optional guest first name or nickname.';
comment on column public.playlist_songs.music_url is 'Optional HTTPS Spotify or Apple Music link.';

alter table public.playlist_songs enable row level security;
alter table public.playlist_songs force row level security;

revoke all on table public.playlist_songs from public, anon, authenticated;
grant all on table public.playlist_songs to service_role;

notify pgrst, 'reload schema';
