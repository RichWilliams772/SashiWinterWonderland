import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Transportation() {
  return (
    <section id="transport" className="scroll-mt-24 px-4 pb-8">
      <div className="glass-card mx-auto max-w-4xl rounded-[1.8rem] px-5 py-8 text-center sm:px-8">
        <SectionHeading title="Getting Around" />
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">
          {trip.transportation.summary}
        </p>
        <ul className="mx-auto mt-5 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-soft">
          {trip.transportation.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
