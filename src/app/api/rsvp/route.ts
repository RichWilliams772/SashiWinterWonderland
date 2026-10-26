import { NextResponse } from "next/server";
import { trip } from "@/data/trip";
import { sendRsvpNotification } from "@/lib/rsvp-email";
import { isRsvpConfigured, validateRsvp } from "@/lib/rsvp";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const INSERT_ATTEMPTS = 3;
const RETRYABLE_STATUS = new Set([502, 503, 504, 520, 521, 522, 523, 524]);
const attempts = new Map<string, number[]>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readSupabaseError(response: Response) {
  const text = await response.text().catch(() => "");
  try {
    const body = JSON.parse(text) as { code?: unknown; message?: unknown };
    return {
      code: typeof body.code === "string" ? body.code : "",
      message: typeof body.message === "string" ? body.message.slice(0, 180) : "",
    };
  } catch {
    return { code: "", message: text.replace(/\s+/g, " ").trim().slice(0, 180) };
  }
}

function fetchFailure(error: unknown) {
  const cause =
    error instanceof Error && "cause" in error
      ? (error.cause as { code?: unknown })
      : undefined;
  return {
    code: typeof cause?.code === "string" ? cause.code : "fetch_failed",
    message: error instanceof Error ? error.message : "fetch failed",
  };
}

async function insertRsvp(
  admin: { url: string; headers: Record<string, string> },
  values: { fullName: string; contact: string; attending: string; dietary: string; message: string },
) {
  for (let attempt = 1; attempt <= INSERT_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(`${admin.url}/rest/v1/rsvps`, {
        method: "POST",
        headers: admin.headers,
        body: JSON.stringify({
          full_name: values.fullName,
          contact: values.contact,
          attending: values.attending,
          dietary: values.dietary || null,
          message: values.message || null,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) return true;

      const detail = await readSupabaseError(response);
      console.error("Supabase RSVP insert failed", {
        attempt,
        status: response.status,
        code: detail.code,
        message: detail.message,
      });
      if (!RETRYABLE_STATUS.has(response.status) || attempt === INSERT_ATTEMPTS) return false;
    } catch (error) {
      const detail = fetchFailure(error);
      console.error("Supabase RSVP insert failed", {
        attempt,
        status: 0,
        code: detail.code,
        message: detail.message,
      });
      if (attempt === INSERT_ATTEMPTS) return false;
    }

    await wait(500 * attempt);
  }

  return false;
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

  const saved = await insertRsvp(admin, parsed.values);
  if (!saved) {
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
