import { CabinIcon, PlaneIcon, SnowflakeIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

const facts = [
  { label: "Dates", value: trip.dates.display, icon: SnowflakeIcon },
  { label: "Duration", value: trip.duration, icon: PlaneIcon },
  { label: "Destination", value: trip.destination, icon: CabinIcon },
];

export function TripOverview() {
  return (
    <section id="trip" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="The Getaway"
        title={trip.eventName}
        subtitle={trip.eventSubtitle}
      />
      <p className="glass-card mx-auto mt-8 max-w-3xl rounded-[1.8rem] px-5 py-6 text-center text-base leading-relaxed text-ink sm:px-8">
        {trip.welcome}
      </p>
      <div className="mx-auto mt-4 grid max-w-4xl gap-4 sm:grid-cols-3">
        {facts.map((fact) => (
          <article key={fact.label} className="glass-card rounded-3xl px-5 py-6 text-center">
            <fact.icon className="mx-auto h-7 w-7 text-rose" />
            <p className="mt-3 text-[0.68rem] tracking-[0.22em] text-rose uppercase">
              {fact.label}
            </p>
            <p className="mt-2 font-display text-2xl text-ink italic">{fact.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
