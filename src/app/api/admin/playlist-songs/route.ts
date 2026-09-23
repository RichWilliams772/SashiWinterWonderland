import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteAdminRow, isUuid, listAdminSongs } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const result = await listAdminSongs();
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "The playlist could not be loaded." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, songs: result.songs });
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "That song could not be deleted." }, { status: 400 });
  }

  const id = String((body as { id?: unknown })?.id ?? "");
  if (!isUuid(id)) {
    return NextResponse.json({ ok: false, message: "That song could not be deleted." }, { status: 400 });
  }

  const result = await deleteAdminRow("playlist_songs", id);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "That song could not be deleted." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
