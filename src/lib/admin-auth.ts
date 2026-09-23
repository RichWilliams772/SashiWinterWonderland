import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const ADMIN_COOKIE = "wonderland_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function sanitize(value: string | undefined) {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

export function getAllowedAdminEmail() {
  return sanitize(process.env.ADMIN_EMAIL).toLowerCase();
}

function getSessionSecret() {
  return sanitize(process.env.ADMIN_SESSION_SECRET);
}

export function isAdminAuthConfigured() {
  return Boolean(getAllowedAdminEmail() && getSessionSecret() && getSessionSecret().length >= 16);
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function signaturesMatch(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createAdminSessionValue(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email: email.toLowerCase(), exp: Date.now() + SESSION_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readAdminSessionValue(value: string | undefined) {
  if (!value || !isAdminAuthConfigured()) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !signaturesMatch(sign(payload), signature)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: unknown;
      exp?: unknown;
    };
    const email = String(data.email ?? "").toLowerCase();
    if (!email || email !== getAllowedAdminEmail()) return null;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { email };
  } catch {
    return null;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}

export async function getAdminSession() {
  const store = await cookies();
  return readAdminSessionValue(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, message: "Sign in required." }, { status: 401 }),
    };
  }
  return { ok: true as const, session };
}

export async function verifyAdminPassword(email: string, password: string) {
  const allowed = getAllowedAdminEmail();
  const admin = getSupabaseAdmin();
  if (!isAdminAuthConfigured() || !admin.ok) return false;
  if (email.toLowerCase() !== allowed) return false;
  if (password.length < 8 || password.length > 200) return false;

  const response = await fetch(`${admin.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: admin.headers.apikey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: allowed, password }),
  });

  return response.ok;
}
