import { NextResponse } from "next/server";
import { isRsvpConfigured, validateRsvp } from "@/lib/rsvp";
import { trip } from "@/data/trip";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
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
      { ok: false, message: "Please wait a few minutes before sending another RSVP." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "That RSVP could not be read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = validateRsvp(body as Record<string, unknown>);
  if (parsed.honeypotTriggered) {
    return NextResponse.json({ ok: true });
  }
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors, message: "Please check the highlighted fields." },
      { status: 400 },
    );
  }

  if (!isRsvpConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        setupIncomplete: true,
        message: trip.rsvp.setupIncomplete,
      },
      { status: 503 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL!.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: parsed.values.fullName,
      contact: parsed.values.contact,
      attending: parsed.values.attending,
      dietary: parsed.values.dietary || null,
      message: parsed.values.message || null,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Supabase RSVP insert failed", response.status, detail);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save your RSVP just now. Please try again or message Sashi.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: trip.rsvp.success });
}
