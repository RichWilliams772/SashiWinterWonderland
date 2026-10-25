import { DownloadTripPdf } from "@/components/DownloadTripPdf";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Pricing() {
  const { pricing } = trip;

  return (
    <section id="prices" className="scroll-mt-24 px-4 py-16">
      <SectionHeading eyebrow="Budget" title="What to Plan For" />
      <article className="mx-auto mt-10 max-w-4xl rounded-3xl bg-gradient-to-b from-[#f7c9d4] to-[#e79aaf] px-5 py-8 text-center text-ink shadow-[0_18px_40px_rgba(183,110,121,0.25)] sm:px-8">
        <p className="text-[0.68rem] font-semibold tracking-[0.24em] uppercase">
          {pricing.label}
        </p>
        <p className="font-display mt-2 text-4xl italic sm:text-5xl">{pricing.amountLine}</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed">{pricing.includes}</p>
      </article>
      <div className="mx-auto mt-4 grid max-w-4xl gap-4">
        <p className="glass-card rounded-3xl px-5 py-5 text-center text-sm leading-relaxed text-ink-soft">
          {pricing.excluded}
        </p>
        <p className="glass-card rounded-3xl px-5 py-5 text-center text-sm leading-relaxed text-ink-soft">
          {pricing.estimateNote}
        </p>
      </div>
      <article className="glass-card mx-auto mt-4 max-w-4xl rounded-3xl px-5 py-6 text-center">
        <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-rose uppercase">
          {trip.deadlines.rsvp.label}
        </p>
        <p className="font-display mt-2 text-3xl text-ink italic">{trip.deadlines.rsvp.display}</p>
        <p className="mt-2 text-sm text-ink-soft">This is the RSVP deadline, not a payment date.</p>
      </article>
      <div className="mt-8 flex justify-center">
        <DownloadTripPdf />
      </div>
    </section>
  );
}
