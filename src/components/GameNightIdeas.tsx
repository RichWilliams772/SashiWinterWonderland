"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { trip } from "@/data/trip";

const STORAGE_KEY = "sashi-wonderland-game-ideas";
const CHANGE_EVENT = "sashi-wonderland-game-ideas-change";
const EMPTY: string[] = [];
let snapshot: string[] = EMPTY;

function readIdeas() {
  try {
    const next = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(next)) return snapshot;
    const cleaned = next
      .map((idea) => String(idea).trim())
      .filter((idea) => idea.length > 0);
    if (
      cleaned.length === snapshot.length &&
      cleaned.every((idea, index) => idea === snapshot[index])
    ) {
      return snapshot;
    }
    snapshot = cleaned;
    return snapshot;
  } catch {
    return snapshot;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function saveIdeas(ideas: string[]) {
  snapshot = ideas;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function GameNightIdeas({ official }: { official: readonly string[] }) {
  const guestIdeas = useSyncExternalStore(subscribe, readIdeas, () => EMPTY);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const idea = draft.replace(/\s+/g, " ").trim();
    if (idea.length < 2) {
      setError("Please enter a game idea.");
      return;
    }
    if (idea.length > 80) {
      setError("Please keep it under 80 characters.");
      return;
    }

    const alreadyListed = [...official, ...guestIdeas].some(
      (item) => item.toLowerCase() === idea.toLowerCase(),
    );
    if (alreadyListed) {
      setError("That one is already on the lineup.");
      return;
    }

    const next = [...guestIdeas, idea];
    saveIdeas(next);
    setDraft("");
    setError("");

    try {
      await fetch("/api/game-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
    } catch {
      // The idea still stays in this guest’s lineup.
    }
  }

  return (
    <div className="mt-4 border-t border-white/60 pt-4">
      <p className="text-sm text-ink-soft">{trip.gameNight.helper}</p>
      {guestIdeas.length > 0 ? (
        <ul className="mt-3 space-y-1 text-sm text-ink">
          {guestIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      ) : null}
      <form className="mt-3 grid gap-2" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          <span className="sr-only">{trip.gameNight.placeholder}</span>
          <input
            name="gameIdea"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={trip.gameNight.placeholder}
            maxLength={80}
            className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
          />
        </label>
        {error ? <p className="text-sm text-rose">{error}</p> : null}
        <button
          type="submit"
          className="satin-btn min-h-11 rounded-full px-5 text-sm font-semibold text-ink"
        >
          {trip.gameNight.button}
        </button>
      </form>
    </div>
  );
}
