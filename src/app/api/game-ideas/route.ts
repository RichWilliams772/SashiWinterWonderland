import { NextResponse } from "next/server";
import { isRsvpConfigured } from "@/lib/rsvp";

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

  if (!isRsvpConfigured()) {
    return NextResponse.json({ ok: true, savedLocally: true });
  }

  const supabaseUrl = process.env.SUPABASE_URL!.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(`${supabaseUrl}/rest/v1/game_ideas`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Supabase game idea insert failed", response.status, detail);
    return NextResponse.json(
      { ok: false, message: "We could not save that idea just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
