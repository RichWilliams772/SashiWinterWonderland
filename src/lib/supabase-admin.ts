type AdminConfig =
  | { ok: true; url: string; headers: Record<string, string> }
  | { ok: false; reason: "missing" | "wrong_key" };

function sanitize(value: string | undefined) {
  return (value ?? "")
    .trim()
    .replace(/^Bearer\s+/i, "")
    .replace(/^["']|["']$/g, "");
}

function configuredKeyKind(token: string) {
  if (token.startsWith("sb_secret_")) return "service" as const;
  if (token.startsWith("sb_publishable_")) return "publishable" as const;

  const payload = token.split(".")[1];
  if (!payload) return "unknown" as const;

  try {
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      role?: unknown;
    };
    if (json.role === "service_role") return "service" as const;
    if (json.role === "anon" || json.role === "authenticated") return "public" as const;
  } catch {
    return "unknown" as const;
  }

  return "unknown" as const;
}

export function getSupabaseAdmin(): AdminConfig {
  const url = sanitize(process.env.SUPABASE_URL).replace(/\/$/, "");
  const serviceKey = sanitize(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceKey) {
    return { ok: false, reason: "missing" };
  }

  if (configuredKeyKind(serviceKey) !== "service") {
    return { ok: false, reason: "wrong_key" };
  }

  return {
    ok: true,
    url,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
  };
}

export function isSupabaseAdminConfigured() {
  return getSupabaseAdmin().ok;
}
