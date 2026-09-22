import { trip } from "@/data/trip";

export function Closing() {
  return (
    <section id="closing" className="px-4 py-16">
      <article className="glass-card mx-auto max-w-2xl rounded-[2rem] px-6 py-10 text-center">
        <p className="font-display text-3xl leading-snug text-ink italic sm:text-4xl">
          {trip.closing.message}
        </p>
        <div className="gold-line mx-auto mt-6 h-px w-24" />
        <p className="font-script mt-6 text-4xl text-rose">{trip.closing.signoff}</p>
      </article>
    </section>
  );
}
