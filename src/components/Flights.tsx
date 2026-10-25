import { PlaneIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Flights() {
  return (
    <section id="flights" className="scroll-mt-24 px-4 py-16">
      <SectionHeading eyebrow="Getting There" title="Flights" />
      <div className="glass-card mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-[1.8rem] px-5 py-6">
        <PlaneIcon className="mt-1 h-8 w-8 shrink-0 text-rose" />
        <p className="text-sm leading-relaxed text-ink sm:text-base">{trip.flights.note}</p>
      </div>
    </section>
  );
}
