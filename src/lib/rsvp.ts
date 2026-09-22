import type { AttendingOption } from "@/data/trip";
import { isSupabaseAdminConfigured } from "@/lib/supabase-admin";

export const ATTENDING_OPTIONS = ["yes", "no", "maybe"] as const;

export type RsvpPayload = {
  fullName: string;
  contact: string;
  attending: AttendingOption;
  dietary: string;
  message: string;
  website?: string;
};

export type RsvpFieldErrors = Partial<
  Record<"fullName" | "contact" | "attending" | "dietary" | "message", string>
>;

const NAME_MAX = 80;
const CONTACT_MAX = 120;
const DIETARY_MAX = 500;
const MESSAGE_MAX = 1000;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s().-]{7,20}$/;

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function validateRsvp(input: Partial<RsvpPayload>): {
  ok: boolean;
  values: RsvpPayload;
  errors: RsvpFieldErrors;
  honeypotTriggered: boolean;
} {
  const values: RsvpPayload = {
    fullName: clean(input.fullName, NAME_MAX),
    contact: clean(input.contact, CONTACT_MAX),
    attending: (input.attending as AttendingOption) ?? "yes",
    dietary: clean(input.dietary, DIETARY_MAX),
    message: clean(input.message, MESSAGE_MAX),
    website: String(input.website ?? "").trim(),
  };

  const errors: RsvpFieldErrors = {};

  if (values.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  const contactLooksValid =
    emailPattern.test(values.contact) || phonePattern.test(values.contact);
  if (!values.contact || !contactLooksValid) {
    errors.contact = "Please enter a valid email or phone number.";
  }

  if (!ATTENDING_OPTIONS.includes(values.attending)) {
    errors.attending = "Please choose Yes, No, or Maybe.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    values,
    errors,
    honeypotTriggered: Boolean(values.website),
  };
}

export function isRsvpConfigured() {
  return isSupabaseAdminConfigured();
}
