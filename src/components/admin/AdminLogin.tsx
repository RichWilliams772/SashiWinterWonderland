"use client";

import { useState, type FormEvent } from "react";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setError(data.message ?? "Those sign-in details did not work.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("We could not reach the admin sign-in just now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="opening-bg flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="glass-card w-full max-w-md rounded-[2rem] px-5 py-8 sm:px-8"
      >
        <p className="text-center text-[0.7rem] font-semibold tracking-[0.28em] text-rose uppercase">
          Private
        </p>
        <h1 className="font-display mt-3 text-center text-4xl text-ink italic">Admin</h1>
        <p className="mt-3 text-center text-sm text-ink-soft">
          Sign in to manage the Wonderland playlist and game-night ideas.
        </p>
        <label className="mt-6 grid gap-2 text-sm">
          <span className="font-semibold text-ink">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
            required
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          <span className="font-semibold text-ink">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
            required
          />
        </label>
        {error ? (
          <p className="mt-4 rounded-2xl bg-blush/60 px-4 py-3 text-sm text-ink" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="satin-btn mt-6 min-h-12 w-full rounded-full text-sm font-semibold text-ink disabled:opacity-70"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
