import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";

export function Cabin() {
  return (
    <section id="cabin" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Stay With Me"
        title={trip.cabin.title}
        subtitle={trip.cabin.location}
      />
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {trip.cabin.gallery.map((photo, index) => (
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
      <div className="glass-card mx-auto mt-6 max-w-3xl rounded-3xl px-5 py-6 text-center">
        <p className="text-sm leading-relaxed text-ink">{trip.cabin.poolNote}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{trip.cabin.bookingNote}</p>
        <a
          href={trip.cabin.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="satin-btn mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-ink"
        >
          {trip.cabin.airbnbLabel}
        </a>
      </div>
    </section>
  );
}
