import { dayIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Links() {
  return (
    <section id="links" className="scroll-mt-24 px-4 py-16">
      <SectionHeading eyebrow="Save These" title="Important Links" />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4">
        {trip.links.map((link) => {
          const Icon = dayIcons[link.icon];
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 rounded-[1.6rem] px-5 py-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(90,45,58,0.12)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush/70 text-rose">
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-2xl text-ink italic">{link.title}</span>
                <span className="block text-sm text-ink-soft">{link.detail}</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
