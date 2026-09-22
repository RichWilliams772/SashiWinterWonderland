import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Packing() {
  return (
    <section id="pack" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Come Prepared"
        title="What to Pack"
        subtitle={trip.packing.intro}
      />
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {trip.packing.groups.map((group) => (
          <article key={group.title} className="glass-card rounded-[1.8rem] px-5 py-6">
            <h3 className="font-display text-2xl text-ink italic">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-rose">♥</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
