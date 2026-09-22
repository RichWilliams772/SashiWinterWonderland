import { PlaneIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

function FlightCard({
  flight,
}: {
  flight: typeof trip.flights.outbound | typeof trip.flights.return;
}) {
  return (
    <article className="glass-card rounded-[1.8rem] px-5 py-6">
      <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-rose uppercase">
        {flight.label} — {flight.day}
      </p>
      <p className="mt-2 font-display text-2xl text-ink italic">{flight.airline}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[0.65rem] tracking-[0.16em] text-ink-soft uppercase">Depart</p>
          <p className="font-display text-3xl text-ink">{flight.depart}</p>
          <p className="mt-1 text-sm text-ink-soft">{flight.from}</p>
        </div>
        <PlaneIcon className="h-8 w-8 shrink-0 text-rose" />
        <div className="flex-1 text-right">
          <p className="text-[0.65rem] tracking-[0.16em] text-ink-soft uppercase">Arrive</p>
          <p className="font-display text-3xl text-ink">{flight.arrive}</p>
          <p className="mt-1 text-sm text-ink-soft">{flight.to}</p>
        </div>
      </div>
    </article>
  );
}

export function Flights() {
  return (
    <section id="flights" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Itinerary in the Sky"
        title="Flight Details"
        subtitle={trip.flights.localTimesNote}
      />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4">
        <FlightCard flight={trip.flights.outbound} />
        <FlightCard flight={trip.flights.return} />
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-soft">
        {trip.flights.estimatedFareNote}
      </p>
      <div className="mt-6 flex justify-center">
        <a
          href={trip.flights.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="satin-btn inline-flex rounded-full px-6 py-3 text-sm font-semibold text-ink"
        >
          {trip.flights.searchLabel}
        </a>
      </div>
    </section>
  );
}
