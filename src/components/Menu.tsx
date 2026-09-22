import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

function MealCard({
  title,
  items,
  accent,
  emoji,
}: {
  title: string;
  items: readonly string[];
  accent: string;
  emoji: string;
}) {
  return (
    <article className="rounded-[1.4rem] bg-white/50 px-4 py-4">
      <p className={`text-[0.68rem] font-semibold tracking-[0.2em] uppercase ${accent}`}>
        {emoji} {title}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-ink">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export function Menu() {
  return (
    <section id="menu" className="scroll-mt-24 px-4 py-16">
      <SectionHeading eyebrow="Cabin Kitchen" title={trip.menu.title} />
      <p className="mx-auto mt-6 max-w-xl rounded-full bg-blush/50 px-5 py-3 text-center text-sm font-semibold text-ink">
        {trip.menu.lunchNote}
      </p>
      <div className="mx-auto mt-8 grid max-w-4xl gap-4">
        {trip.menu.days.map((day) => (
          <article key={day.id} className="glass-card rounded-[1.8rem] px-5 py-6">
            <h3 className="font-display text-2xl text-ink italic">{day.dateLabel}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {day.breakfast ? (
                <MealCard
                  title={day.breakfast.title}
                  items={day.breakfast.items}
                  accent="text-rosegold"
                  emoji="🥞"
                />
              ) : null}
              {day.dinner ? (
                <MealCard
                  title={day.dinner.title}
                  items={day.dinner.items}
                  accent="text-rose"
                  emoji="🍽️"
                />
              ) : null}
              {day.treats ? (
                <div className="sm:col-span-2">
                  <MealCard
                    title={day.treats.title}
                    items={day.treats.items}
                    accent="text-rose"
                    emoji="🍪"
                  />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
