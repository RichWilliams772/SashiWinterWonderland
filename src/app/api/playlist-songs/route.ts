import { NextResponse } from "next/server";
import { trip } from "@/data/trip";
import {
  publicPlaylistSong,
  validatePlaylistSong,
  type PlaylistSong,
} from "@/lib/playlist";
import { isRsvpConfigured } from "@/lib/rsvp";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const attempts = new Map<string, number[]>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function tooMany(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

async function fetchPlaylist(admin: Extract<ReturnType<typeof getSupabaseAdmin>, { ok: true }>) {
  const response = await fetch(
    `${admin.url}/rest/v1/playlist_songs?select=id,created_at,song_title,artist,submitted_by,music_url&order=created_at.asc`,
    {
      headers: {
        apikey: admin.headers.apikey,
        Authorization: admin.headers.Authorization,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { ok: false as const, status: response.status };
  }

  const rows = (await response.json()) as unknown;
  const songs = Array.isArray(rows)
    ? rows
        .map((row) => publicPlaylistSong((row ?? {}) as Record<string, unknown>))
        .filter((song): song is PlaylistSong => Boolean(song))
    : [];

  return { ok: true as const, songs };
}

export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin.ok || !isRsvpConfigured()) {
    return NextResponse.json({ ok: true, songs: [], setupIncomplete: true });
  }

  const result = await fetchPlaylist(admin);
  if (!result.ok) {
    console.error("Supabase playlist read failed", result.status);
    return NextResponse.json({ ok: true, songs: [], setupIncomplete: true });
  }

  return NextResponse.json({ ok: true, songs: result.songs });
}

export async function POST(request: Request) {
  if (tooMany(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Please wait a few minutes before adding more songs." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "That song could not be read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = validatePlaylistSong((body ?? {}) as Record<string, unknown>);
  if (parsed.honeypotTriggered) {
    return NextResponse.json({ ok: true });
  }
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors, message: "Please check the highlighted fields." },
      { status: 400 },
    );
  }

  const admin = getSupabaseAdmin();
  if (!admin.ok || !isRsvpConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        setupIncomplete: true,
        message: trip.playlist.setupIncomplete,
      },
      { status: 503 },
    );
  }

  const titleKey = parsed.values.songTitle.toLowerCase();
  const artistKey = parsed.values.artist.toLowerCase();
  const existing = await fetch(
    `${admin.url}/rest/v1/playlist_songs?title_key=eq.${encodeURIComponent(titleKey)}&artist_key=eq.${encodeURIComponent(artistKey)}&select=id&limit=1`,
    {
      headers: {
        apikey: admin.headers.apikey,
        Authorization: admin.headers.Authorization,
      },
      cache: "no-store",
    },
  );

  if (existing.ok) {
    const rows = (await existing.json()) as unknown;
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({
        ok: true,
        alreadyListed: true,
        message: trip.playlist.alreadyListed,
      });
    }
  }

  const response = await fetch(`${admin.url}/rest/v1/playlist_songs`, {
    method: "POST",
    headers: admin.headers,
    body: JSON.stringify({
      song_title: parsed.values.songTitle,
      artist: parsed.values.artist,
      submitted_by: parsed.values.submittedBy || null,
      music_url: parsed.values.musicUrl || null,
    }),
  });

  if (response.status === 409) {
    return NextResponse.json({
      ok: true,
      alreadyListed: true,
      message: trip.playlist.alreadyListed,
    });
  }

  if (!response.ok) {
    console.error("Supabase playlist insert failed", response.status);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save that song just now. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: trip.playlist.success });
}
