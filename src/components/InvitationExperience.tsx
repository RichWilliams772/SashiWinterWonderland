"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { InvitationSite } from "@/components/InvitationSite";
import { trip } from "@/data/trip";

type Phase = "sealed" | "opening" | "revealed" | "exploring";
type StoredPhase = "none" | "revealed" | "exploring";

const CHANGE_EVENT = "sashi-wonderland-opened-change";

function subscribeOpened(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function readOpened(): StoredPhase {
  const value = window.localStorage.getItem(trip.storageKey);
  if (value === "exploring" || value === "1") return "exploring";
  if (value === "revealed") return "revealed";
  return "none";
}

function persist(value: StoredPhase) {
  window.localStorage.setItem(trip.storageKey, value);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function InvitationExperience() {
  const stored = useSyncExternalStore(subscribeOpened, readOpened, () => "none");
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    if (phase !== "opening") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReduced ? 0 : 1800;
    const id = window.setTimeout(() => {
      persist("revealed");
      setPhase("revealed");
    }, delay);
    return () => window.clearTimeout(id);
  }, [phase]);

  function openEnvelope() {
    if (phase !== "sealed") return;
    setPhase("opening");
  }

  function exploreTrip() {
    persist("exploring");
    setPhase("exploring");
    window.requestAnimationFrame(() => {
      document.getElementById("top")?.focus();
    });
  }

  const view: Phase =
    stored === "exploring" || phase === "exploring"
      ? "exploring"
      : stored === "revealed" || phase === "revealed"
        ? "revealed"
        : phase;

  if (view === "exploring") {
    return <InvitationSite />;
  }

  return (
    <EnvelopeOpening phase={view} onOpen={openEnvelope} onExplore={exploreTrip} />
  );
}
