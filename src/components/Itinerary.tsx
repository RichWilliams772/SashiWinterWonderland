"use client";

import { useState } from "react";
import { GameNightIdeas } from "@/components/GameNightIdeas";
import { dayIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Itinerary() {
  const [openId, setOpenId] = useState<string>("thursday");

  return (
    <section id="itinerary" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Four Dreamy Days"
        title="Day-by-Day"
        subtitle="Tap a day to peek at the plan. Times after landing are approximate unless a flight time is listed."
      />
      <div className="mx-auto mt-10 grid max-w-3xl gap-4">
        {trip.itinerary.map((day) => {
          const Icon = dayIcons[day.icon];
          const isOpen = openId === day.id;
          return (
            <article key={day.id} className="glass-card overflow-hidden rounded-[1.8rem]">
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
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
              {isOpen ? (
                <div className="border-t border-white/60 px-5 py-5">
                  <ol className="space-y-3">
                    {day.items.map((item) => {
                      const time = "time" in item ? item.time : undefined;
                      const note = "note" in item ? item.note : undefined;
                      return (
                        <li key={`${time ?? ""}-${item.text}`} className="flex gap-3">
                          {time ? (
                            <span className="w-24 shrink-0 text-xs font-semibold tracking-wide text-rose uppercase">
                              {time}
                            </span>
                          ) : (
                            <span className="w-24 shrink-0 text-xs text-rosegold">•</span>
                          )}
                          <span>
                            <span className="block text-sm text-ink">{item.text}</span>
                            {note ? (
                              <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                                {note}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                  {day.extras?.map((extra) => (
                    <div key={extra.title} className="mt-5 rounded-2xl bg-white/45 px-4 py-4">
                      <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-rose uppercase">
                        {extra.title}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-ink">
                        {extra.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {extra.title === "Game Night Lineup" ? (
                        <GameNightIdeas official={extra.items} />
                      ) : null}
                    </div>
                  ))}
                  {day.notes?.map((note) => (
                    <p key={note} className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {note}
                    </p>
                  ))}
                  {day.id === "friday" ? (
                    <a
                      href={trip.excursions.snowmobiling.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-rose underline-offset-4 hover:underline"
                    >
                      Snowmobiling details
                    </a>
                  ) : null}
                  {day.id === "saturday" ? (
                    <a
                      href={trip.excursions.suncadia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-rose underline-offset-4 hover:underline"
                    >
                      Snow tubing & holiday activities
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
