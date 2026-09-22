import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function DressCode() {
  return (
    <section id="dress" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Looks of the Trip"
        title="Dress Code"
        subtitle="Pretty, practical, and a little bit extra."
      />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {trip.dressCode.map((look) => (
          <article key={look.day} className="glass-card rounded-[1.8rem] px-5 py-6">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-rose uppercase">
              {look.day}
            </p>
            <h3 className="font-display mt-2 text-2xl text-ink italic">{look.title}</h3>
            <p className="mt-2 text-base font-semibold text-ink">{look.look}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{look.detail}</p>
            {"shops" in look && look.shops ? (
              <div className="mt-4 grid gap-2">
                {look.shops.map((shop) => (
                  <a
                    key={shop.url}
                    href={shop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="satin-btn inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-ink"
                  >
                    {shop.label}
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
