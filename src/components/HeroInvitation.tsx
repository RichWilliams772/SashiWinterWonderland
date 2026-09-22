import Image from "next/image";
import { Countdown } from "@/components/Countdown";
import { BowIcon } from "@/components/icons";
import { trip } from "@/data/trip";

export function HeroInvitation() {
  return (
    <section id="top" tabIndex={-1} className="relative overflow-hidden px-4 pt-10 pb-16 outline-none sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(90,45,58,0.16)]">
          <Image
            src="/images/invitation-card.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-ivory/78" />
          <div className="relative px-5 py-10 text-center sm:px-12 sm:py-14">
            <BowIcon className="mx-auto h-10 w-16" />
            <p className="mt-3 text-[0.7rem] font-semibold tracking-[0.32em] text-rose uppercase">
              {trip.eventSubtitle}
            </p>
            <h1 className="font-script mt-3 text-5xl leading-tight text-ink sm:text-6xl">
              {trip.brand}
            </h1>
            <div className="gold-line mx-auto mt-5 h-px w-28" />
            <p className="font-display mx-auto mt-6 max-w-md text-3xl leading-snug text-ink italic sm:text-4xl">
              {trip.revealHeadline}
              <br />
              {trip.revealSubheadline}
            </p>
            <p className="mt-5 text-base text-ink-soft">{trip.dates.display}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {trip.duration} · {trip.destination}
            </p>
          </div>
        </div>
        <Countdown />
      </div>
    </section>
  );
}
