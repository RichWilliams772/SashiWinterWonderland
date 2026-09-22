"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { formatUsd, getTripDetailsText, trip } from "@/data/trip";

const prices = [
  {
    label: trip.pricing.sharedLabel,
    amount: trip.pricing.sharedContribution,
    hint: trip.pricing.includes,
  },
  {
    label: trip.pricing.flightLabel,
    amount: trip.pricing.estimatedFlight,
    hint: "American Airlines · MIA ⇄ SEA",
  },
  {
    label: trip.pricing.totalLabel,
    amount: trip.pricing.estimatedBaseTotal,
    hint: "Contribution + airfare",
    featured: true,
  },
];

export function Pricing() {
  const [copied, setCopied] = useState(false);

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(getTripDetailsText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="prices" className="scroll-mt-24 px-4 py-16">
      <SectionHeading eyebrow="Prices & Deadlines" title="What to Plan For" />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4">
        {prices.map((price) => (
          <article
            key={price.label}
            className={`rounded-3xl px-5 py-6 text-center sm:px-8 ${
              price.featured
                ? "bg-gradient-to-b from-[#f7c9d4] to-[#e79aaf] text-ink shadow-[0_18px_40px_rgba(183,110,121,0.25)]"
                : "glass-card"
            }`}
          >
            <p className="text-[0.68rem] font-semibold tracking-[0.24em] uppercase">
              {price.label}
            </p>
            <p className="font-display mt-2 text-5xl italic">
              {formatUsd(price.amount)}
              <span className="ml-2 text-2xl not-italic">per person</span>
            </p>
            <p className="mt-2 text-sm opacity-80">{price.hint}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
        {trip.pricing.footnote}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
        {trip.flights.estimatedFareNote}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
        {trip.pricing.planningNote}
      </p>
      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
        {[trip.deadlines.rsvp, trip.deadlines.payment].map((deadline) => (
          <article key={deadline.label} className="glass-card rounded-3xl px-5 py-6 text-center">
            <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-rose uppercase">
              {deadline.label}
            </p>
            <p className="font-display mt-2 text-3xl text-ink italic">{deadline.display}</p>
          </article>
        ))}
      </div>
      <div className="glass-card mx-auto mt-6 max-w-4xl rounded-3xl px-5 py-6 text-center">
        <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-rose uppercase">
          Payment details
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {trip.pricing.paymentPlaceholder}
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={copyDetails}
          className="satin-btn rounded-full px-6 py-3 text-sm font-semibold text-ink"
        >
          {copied ? "Copied 💗" : "Copy Trip Details"}
        </button>
      </div>
    </section>
  );
}
