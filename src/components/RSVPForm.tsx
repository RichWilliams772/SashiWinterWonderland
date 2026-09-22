"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { trip, type AttendingOption } from "@/data/trip";
import { ATTENDING_OPTIONS, type RsvpFieldErrors } from "@/lib/rsvp";

const attendingLabels: Record<AttendingOption, string> = {
  yes: "Yes",
  no: "No",
  maybe: "Maybe",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; setupIncomplete?: boolean };

export function RSVPForm() {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState<AttendingOption>("yes");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<RsvpFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });
    setErrors({});

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          contact,
          attending,
          dietary,
          message,
          website,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        setupIncomplete?: boolean;
        errors?: RsvpFieldErrors;
      };

      if (data.errors) setErrors(data.errors);

      if (response.ok && data.ok) {
        setStatus({ kind: "success", message: data.message ?? trip.rsvp.success });
        setFullName("");
        setContact("");
        setDietary("");
        setMessage("");
        setAttending("yes");
        return;
      }

      setStatus({
        kind: "error",
        message: data.message ?? "Something went wrong. Please try again.",
        setupIncomplete: data.setupIncomplete,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the RSVP service. Please try again.",
      });
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-24 px-4 py-16 pb-32">
      <div className="glass-card mx-auto max-w-2xl rounded-[2rem] px-5 py-8 sm:px-8">
        <SectionHeading title={trip.rsvp.heading} subtitle={trip.rsvp.deadlineLine} />
        {status.kind === "success" ? (
          <div className="mt-8 rounded-3xl bg-white/55 px-5 py-6 text-center" role="status">
            <p className="font-display text-2xl text-ink italic">You’re on the list</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{status.message}</p>
            <a
              href={trip.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="satin-btn mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-ink"
            >
              {trip.whatsapp.label}
            </a>
          </div>
        ) : (
          <form className="relative mt-8 grid gap-4" onSubmit={onSubmit} noValidate>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold text-ink">Full name</span>
              <input
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
                required
              />
              {errors.fullName ? <span className="text-rose">{errors.fullName}</span> : null}
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold text-ink">Email or phone number</span>
              <input
                name="contact"
                autoComplete="tel"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
                required
              />
              {errors.contact ? <span className="text-rose">{errors.contact}</span> : null}
            </label>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-ink">Attending</legend>
              <div className="grid grid-cols-3 gap-2">
                {ATTENDING_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`flex min-h-12 items-center justify-center rounded-2xl border text-sm font-semibold ${
                      attending === option
                        ? "border-rose bg-blush text-ink"
                        : "border-rose/20 bg-white/70 text-ink-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option}
                      checked={attending === option}
                      onChange={() => setAttending(option)}
                      className="sr-only"
                    />
                    {attendingLabels[option]}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold text-ink">Dietary restrictions or food allergies</span>
              <textarea
                name="dietary"
                value={dietary}
                onChange={(event) => setDietary(event.target.value)}
                rows={3}
                className="rounded-2xl border border-rose/20 bg-white/70 px-4 py-3 text-ink"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-semibold text-ink">Optional message for Sashi</span>
              <textarea
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                className="rounded-2xl border border-rose/20 bg-white/70 px-4 py-3 text-ink"
              />
            </label>
            <div className="hidden" aria-hidden="true">
              <label>
                Company website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>
            </div>
            {status.kind === "error" ? (
              <p
                className={`rounded-2xl px-4 py-3 text-sm ${
                  status.setupIncomplete
                    ? "bg-champagne/70 text-ink"
                    : "bg-blush/60 text-ink"
                }`}
                role="alert"
              >
                {status.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status.kind === "submitting"}
              className="satin-btn min-h-12 rounded-full text-sm font-semibold text-ink disabled:opacity-70"
            >
              {status.kind === "submitting" ? "Sending…" : "Send RSVP 💌"}
            </button>
          </form>
        )}
        <div className="mt-8 text-center">
          <a
            href={trip.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,211,102,0.28)]"
          >
            {trip.whatsapp.label}
          </a>
        </div>
      </div>
    </section>
  );
}
