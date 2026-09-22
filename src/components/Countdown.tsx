"use client";

import { useSyncExternalStore } from "react";
import { trip } from "@/data/trip";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
};

function getRemaining(now = Date.now()): Remaining {
  const target = new Date(trip.dates.countdownIso).getTime();
  const diff = target - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    passed: false,
  };
}

let snapshot: Remaining = getRemaining();

function readRemaining() {
  const next = getRemaining();
  if (
    snapshot.days === next.days &&
    snapshot.hours === next.hours &&
    snapshot.minutes === next.minutes &&
    snapshot.seconds === next.seconds &&
    snapshot.passed === next.passed
  ) {
    return snapshot;
  }
  snapshot = next;
  return snapshot;
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

const serverSnapshot: Remaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  passed: false,
};

export function Countdown() {
  const remaining = useSyncExternalStore(subscribe, readRemaining, () => serverSnapshot);

  if (remaining.passed) {
    return (
      <div className="glass-card mx-auto mt-8 max-w-lg rounded-3xl px-5 py-5 text-center">
        <p className="font-display text-2xl text-ink italic">Wonderland is here</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          The getaway has begun. Thank you for celebrating Sashi’s birthday in the snow.
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="glass-card mx-auto mt-8 max-w-lg rounded-3xl px-4 py-5 sm:px-6">
      <p className="text-center text-[0.68rem] font-semibold tracking-[0.28em] text-rose uppercase">
        Until we leave for Wonderland
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-2xl bg-white/50 px-1 py-3">
            <p className="font-display text-3xl text-ink tabular-nums sm:text-4xl">
              {String(unit.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.62rem] tracking-[0.16em] text-ink-soft uppercase">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
