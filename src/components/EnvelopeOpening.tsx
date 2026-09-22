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
    <div className="wonderland-bg relative flex min-h-dvh flex-col overflow-hidden px-4 py-10">
      <Image
        src="/images/wonderland-forest.png"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
        priority
      />
      <Snowfall />
      <Starfield />
      <PineDecor />
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
        {phase !== "revealed" ? (
          <>
            <p className="font-script text-4xl leading-tight text-ink sm:text-5xl">
              {trip.inviteLine}
            </p>
            <p className="mt-3 text-sm tracking-[0.22em] text-ink-soft uppercase">
              {trip.dates.display}
            </p>
            <div className="relative mt-10">
              <Image
                src="/images/pink-envelope.png"
                alt=""
                width={420}
                height={315}
                className={`pointer-events-none absolute -inset-x-10 -top-16 mx-auto w-[calc(100%+5rem)] opacity-35 ${
                  isOpen ? "opacity-0 transition-opacity duration-700" : ""
                }`}
                priority
              />
              <Envelope isOpen={isOpen} onOpen={onOpen} />
            </div>
            <button
              type="button"
              onClick={onOpen}
              disabled={isOpen}
              className="satin-btn mt-10 min-h-12 rounded-full px-7 text-sm font-semibold text-ink disabled:opacity-70"
            >
              Click to Open 💗
            </button>
          </>
        ) : (
          <article className="reveal-card relative w-full overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(90,45,58,0.18)]">
            <Image
              src="/images/invitation-card.png"
              alt=""
              fill
              className="object-cover"
              sizes="420px"
            />
            <div className="absolute inset-0 bg-ivory/80" />
            <div className="relative px-6 py-12">
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
        )}
      </div>
    </div>
  );
}
