import Image from "next/image";
import { BowIcon, SnowflakeIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Cabin() {
  const photos = trip.cabin.photos;

  return (
    <section id="cabin" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="The Stay"
        title={trip.cabin.title}
        subtitle={trip.cabin.location}
      />

      {photos.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`glass-card overflow-hidden rounded-[1.6rem] ${
                index === 0 ? "md:col-span-3" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? "100vw" : "50vw"}
                />
              </div>
              <figcaption className="px-4 py-3 text-center text-sm text-ink-soft">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="glass-card relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] px-5 py-10 text-center sm:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <SnowflakeIcon className="absolute top-5 left-5 h-6 w-6 text-rose" />
            <SnowflakeIcon className="absolute top-10 right-8 h-4 w-4 text-blush-deep" />
            <SnowflakeIcon className="absolute bottom-8 left-10 h-5 w-5 text-rose/70" />
            <SnowflakeIcon className="absolute right-6 bottom-6 h-7 w-7 text-blush-deep" />
          </div>
          <BowIcon className="relative mx-auto h-10 w-16" />
          <p className="font-display relative mt-4 text-3xl text-ink italic">
            Our winter hideaway
          </p>
          <p className="relative mx-auto mt-3 max-w-md text-base leading-relaxed text-ink">
            {trip.cabin.bookingNote}
          </p>
          <div className="relative mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {trip.cabin.highlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-[1.4rem] bg-ivory/70 px-4 py-4"
              >
                <p className="font-display text-lg text-ink italic">{highlight.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{highlight.detail}</p>
              </article>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
