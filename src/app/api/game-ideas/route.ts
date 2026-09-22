import { NextResponse } from "next/server";
import { isRsvpConfigured } from "@/lib/rsvp";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
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

export async function POST(request: Request) {
  if (tooMany(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Please wait a few minutes before adding another idea." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "That idea could not be read." }, { status: 400 });
  }

  const idea = String((body as { idea?: unknown })?.idea ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  if (idea.length < 2) {
    return NextResponse.json({ ok: false, message: "Please enter a game idea." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  if (!admin.ok || !isRsvpConfigured()) {
    return NextResponse.json({ ok: true, savedLocally: true });
  }

  const response = await fetch(`${admin.url}/rest/v1/game_ideas`, {
    method: "POST",
    headers: admin.headers,
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    console.error("Supabase game idea insert failed", response.status);
    return NextResponse.json(
      { ok: false, message: "We could not save that idea just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
