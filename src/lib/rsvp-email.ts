import { createHash } from "crypto";
import { Resend } from "resend";
import type { RsvpPayload } from "@/lib/rsvp";

const ATTENDING_LABELS = {
  yes: "Yes",
  no: "No",
  maybe: "Maybe",
} as const;

const NOTIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const recentNotifications = new Map<string, number>();

function sanitizeEnv(value: string | undefined) {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getNotificationConfig() {
  const apiKey = sanitizeEnv(process.env.RESEND_API_KEY);
  const to = sanitizeEnv(process.env.RSVP_NOTIFICATION_EMAIL);
  const from = sanitizeEnv(process.env.RSVP_FROM_EMAIL);

  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

function notificationKey(values: RsvpPayload) {
  return createHash("sha256")
    .update(
      [
        values.fullName.toLowerCase(),
        values.contact.toLowerCase(),
        values.attending,
        values.dietary.toLowerCase(),
        values.message.toLowerCase(),
      ].join("\n"),
    )
    .digest("hex");
}

function alreadyNotified(key: string) {
  const now = Date.now();
  for (const [existing, sentAt] of recentNotifications) {
    if (now - sentAt > NOTIFICATION_TTL_MS) {
      recentNotifications.delete(existing);
    }
  }
  return recentNotifications.has(key);
}

function markNotified(key: string) {
  recentNotifications.set(key, Date.now());
}

export async function sendRsvpNotification(values: RsvpPayload) {
  const config = getNotificationConfig();
  if (!config) return;

  const key = notificationKey(values);
  if (alreadyNotified(key)) return;

  const attending = ATTENDING_LABELS[values.attending];
  const dietary = values.dietary || "None listed";
  const message = values.message || "None";

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send(
      {
        from: config.from,
        to: config.to,
        subject: `New RSVP: ${values.fullName} (${attending})`,
        text: [
          "A new RSVP was saved.",
          "",
          `Name: ${values.fullName}`,
          `Attending: ${attending}`,
          `Contact: ${values.contact}`,
          `Dietary restrictions: ${dietary}`,
          `Message: ${message}`,
        ].join("\n"),
        html: `
          <h1>New RSVP</h1>
          <p>A new RSVP was saved.</p>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(values.fullName)}</li>
            <li><strong>Attending:</strong> ${escapeHtml(attending)}</li>
            <li><strong>Contact:</strong> ${escapeHtml(values.contact)}</li>
            <li><strong>Dietary restrictions:</strong> ${escapeHtml(dietary)}</li>
            <li><strong>Message:</strong> ${escapeHtml(message)}</li>
          </ul>
        `,
      },
      { idempotencyKey: `rsvp-${key}` },
    );

    if (error) {
      console.error("RSVP notification email failed");
      return;
    }

    markNotified(key);
  } catch {
    console.error("RSVP notification email failed");
  }
}
