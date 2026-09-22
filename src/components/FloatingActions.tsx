import { trip } from "@/data/trip";

export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2">
        <a
          href="#rsvp"
          className="satin-btn flex min-h-12 flex-1 items-center justify-center rounded-full text-sm font-semibold text-ink"
        >
          RSVP Now
        </a>
        <a
          href={trip.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#25D366] px-3 text-sm font-semibold text-white"
        >
          Join Group Chat
        </a>
      </div>
    </div>
  );
}
