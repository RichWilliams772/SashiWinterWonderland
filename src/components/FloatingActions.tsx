export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg">
        <a
          href="#rsvp"
          className="satin-btn flex min-h-12 flex-1 items-center justify-center rounded-full text-sm font-semibold text-ink"
        >
          RSVP Now
        </a>
      </div>
    </div>
  );
}
