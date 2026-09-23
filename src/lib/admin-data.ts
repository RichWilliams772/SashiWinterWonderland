import { publicPlaylistSong, type PlaylistSong } from "@/lib/playlist";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type AdminGameIdea = {
  id: string;
  idea: string;
  createdAt: string;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string) {
  return UUID.test(value);
}

function authHeaders(admin: Extract<ReturnType<typeof getSupabaseAdmin>, { ok: true }>) {
  return {
    apikey: admin.headers.apikey,
    Authorization: admin.headers.Authorization,
  };
}

export async function listAdminSongs() {
  const admin = getSupabaseAdmin();
  if (!admin.ok) return { ok: false as const, songs: [] as PlaylistSong[] };

  const response = await fetch(
    `${admin.url}/rest/v1/playlist_songs?select=id,created_at,song_title,artist,submitted_by,music_url&order=created_at.desc`,
    { headers: authHeaders(admin), cache: "no-store" },
  );
  if (!response.ok) return { ok: false as const, songs: [] as PlaylistSong[] };

  const rows = (await response.json()) as unknown;
  const songs = Array.isArray(rows)
    ? rows
        .map((row) => publicPlaylistSong((row ?? {}) as Record<string, unknown>))
        .filter((song): song is PlaylistSong => Boolean(song))
    : [];

  return { ok: true as const, songs };
}

export async function listAdminGameIdeas() {
  const admin = getSupabaseAdmin();
  if (!admin.ok) return { ok: false as const, ideas: [] as AdminGameIdea[] };

  const response = await fetch(
    `${admin.url}/rest/v1/game_ideas?select=id,created_at,idea&order=created_at.desc`,
    { headers: authHeaders(admin), cache: "no-store" },
  );
  if (!response.ok) return { ok: false as const, ideas: [] as AdminGameIdea[] };

  const rows = (await response.json()) as unknown;
  const ideas = Array.isArray(rows)
    ? rows.flatMap((row) => {
        const item = (row ?? {}) as Record<string, unknown>;
        const idea = String(item.idea ?? "").trim();
        const id = String(item.id ?? "");
        if (!idea || !id) return [];
        return [{ id, idea: idea.slice(0, 80), createdAt: String(item.created_at ?? "") }];
      })
    : [];

  return { ok: true as const, ideas };
}

export async function deleteAdminRow(table: "playlist_songs" | "game_ideas", id: string) {
  const admin = getSupabaseAdmin();
  if (!admin.ok || !isUuid(id)) return { ok: false as const, status: 400 };

  const response = await fetch(`${admin.url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(admin),
  });

  return { ok: response.ok, status: response.status };
}
