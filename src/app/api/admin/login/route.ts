import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionValue,
  getAllowedAdminEmail,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
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
      { ok: false, message: "Please wait a few minutes before trying again." },
      { status: 429 },
    );
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Admin sign-in is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "That sign-in could not be read." }, { status: 400 });
  }

  const email = String((body as { email?: unknown })?.email ?? "").trim();
  const password = String((body as { password?: unknown })?.password ?? "");

  const allowed = await verifyAdminPassword(email, password);
  if (!allowed) {
    return NextResponse.json({ ok: false, message: "Those sign-in details did not work." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSessionValue(getAllowedAdminEmail()), adminCookieOptions());
  return response;
}
