"use client";

import Image from "next/image";
import { Envelope } from "@/components/Envelope";
import { PineDecor, Starfield } from "@/components/PineDecor";
import { Snowfall } from "@/components/Snowfall";
import { trip } from "@/data/trip";

type EnvelopeOpeningProps = {
  phase: "sealed" | "opening" | "revealed";
  onOpen: () => void;
  onExplore: () => void;
};

export function EnvelopeOpening({ phase, onOpen, onExplore }: EnvelopeOpeningProps) {
  const isOpen = phase !== "sealed";

  return (
    <div className="opening-bg relative flex min-h-dvh flex-col overflow-x-hidden px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Snowfall />
      <Starfield />
      <PineDecor />
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
        {phase === "revealed" ? (
          <article className="reveal-card relative w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(90,45,58,0.18)]">
            <Image
              src="/images/invitation-card.png"
              alt=""
              fill
              className="object-cover"
              sizes="420px"
            />
            <div className="absolute inset-0 bg-ivory/80" />
            <div className="relative px-6 py-10 sm:py-12">
              <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-rose uppercase">
                {trip.eventName}
              </p>
              <h1 className="font-display mt-4 text-4xl leading-tight text-ink italic sm:text-5xl">
                {trip.revealHeadline}
                <br />
                {trip.revealSubheadline}
              </h1>
              <p className="mt-5 text-sm text-ink-soft">{trip.dates.display}</p>
              <p className="mt-1 text-sm text-ink-soft">{trip.destination}</p>
              <button
                type="button"
                onClick={onExplore}
                className="satin-btn mt-8 min-h-12 rounded-full px-7 text-sm font-semibold text-ink"
              >
                Explore the Trip
              </button>
            </div>
          </article>
        ) : (
          <div className="flex w-full max-w-md flex-col items-center gap-4 sm:gap-6">
            <div>
              <p className="font-script text-[2rem] leading-tight text-ink sm:text-4xl md:text-5xl">
                {trip.inviteLine}
              </p>
              <p className="mt-2 text-[0.7rem] tracking-[0.22em] text-ink-soft uppercase sm:mt-3 sm:text-sm">
                {trip.dates.display}
              </p>
            </div>
            <Envelope isOpen={isOpen} onOpen={onOpen} />
            {phase === "sealed" ? (
              <button
                type="button"
                onClick={onOpen}
                className="satin-btn relative z-20 min-h-12 shrink-0 rounded-full px-7 text-sm font-semibold text-ink"
              >
                Click to Open 💗
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
