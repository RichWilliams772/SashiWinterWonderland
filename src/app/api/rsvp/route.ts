import { NextResponse } from "next/server";
import { trip } from "@/data/trip";
import { sendRsvpNotification } from "@/lib/rsvp-email";
import { isRsvpConfigured, validateRsvp } from "@/lib/rsvp";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

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

  const admin = getSupabaseAdmin();
  if (!admin.ok || !isRsvpConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        setupIncomplete: true,
        message: trip.rsvp.setupIncomplete,
      },
      { status: 503 },
    );
  }

  const response = await fetch(`${admin.url}/rest/v1/rsvps`, {
    method: "POST",
    headers: admin.headers,
    body: JSON.stringify({
      full_name: parsed.values.fullName,
      contact: parsed.values.contact,
      attending: parsed.values.attending,
      dietary: parsed.values.dietary || null,
      message: parsed.values.message || null,
    }),
  });

  if (!response.ok) {
    console.error("Supabase RSVP insert failed", response.status);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save your RSVP just now. Please try again or message Sashi or Tabby.",
      },
      { status: 502 },
    );
  }

  await sendRsvpNotification(parsed.values);

  return NextResponse.json({ ok: true, message: trip.rsvp.success });
}
