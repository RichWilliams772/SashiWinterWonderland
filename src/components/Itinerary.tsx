"use client";

import { useState } from "react";
import { dayIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Itinerary() {
  const [openId, setOpenId] = useState<string>("wednesday");

  return (
    <section id="itinerary" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Five Days Together"
        title="Day-by-Day"
        subtitle={trip.itineraryNote}
      />
      <div className="mx-auto mt-10 grid max-w-3xl gap-4">
        {trip.itinerary.map((day) => {
          const Icon = dayIcons[day.icon];
          const isOpen = openId === day.id;
          return (
            <article key={day.id} className="glass-card overflow-hidden rounded-[1.8rem]">
              <h3>
                <button
                  id={`${day.id}-toggle`}
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`${day.id}-details`}
                  onClick={() => setOpenId(isOpen ? "" : day.id)}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush/70 text-rose">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.68rem] tracking-[0.2em] text-rose uppercase">
                      {day.dateLabel}
                    </span>
                    <span className="font-display mt-1 block text-2xl leading-tight text-ink italic">
                      {day.theme}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{day.subtitle}</span>
                  </span>
                  <span className="text-rose" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={`${day.id}-details`}
                role="region"
                aria-labelledby={`${day.id}-toggle`}
                hidden={!isOpen}
                className="border-t border-white/60 px-5 py-5"
              >
                <dl className="grid gap-4">
                  {day.blocks.map((block) => (
                    <div key={block.label}>
                      <dt className="text-[0.68rem] font-semibold tracking-[0.18em] text-rose uppercase">
                        {block.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink">{block.text}</dd>
                    </div>
                  ))}
                </dl>
                {day.notes?.map((note) => (
                  <p key={note} className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {note}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
