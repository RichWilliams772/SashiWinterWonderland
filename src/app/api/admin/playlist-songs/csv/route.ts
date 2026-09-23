import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { csvResponse, toCsv } from "@/lib/admin-csv";
import { listAdminSongs } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const result = await listAdminSongs();
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "The playlist could not be downloaded." }, { status: 502 });
  }

  const csv = toCsv(
    ["song_title", "artist", "submitted_by", "music_url", "created_at"],
    result.songs.map((song) => [
      song.songTitle,
      song.artist,
      song.submittedBy ?? "",
      song.musicUrl ?? "",
      song.createdAt,
    ]),
  );

  return csvResponse("wonderland-playlist.csv", csv);
}
