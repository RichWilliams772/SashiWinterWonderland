"use client";

import { useState } from "react";
import { SnowflakeIcon } from "@/components/icons";
import { trip } from "@/data/trip";

const navItems = [
  { href: "#trip", label: "Trip" },
  { href: "#prices", label: "Budget" },
  { href: "#cabin", label: "Cabin" },
  { href: "#flights", label: "Flights" },
  { href: "#itinerary", label: "Days" },
  { href: "#menu", label: "Menu" },
  { href: "#rsvp", label: "RSVP" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-ivory/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 text-ink">
          <SnowflakeIcon className="h-5 w-5 text-rose" />
          <span className="font-display max-w-[12rem] text-base leading-tight italic sm:max-w-[16rem] sm:text-lg lg:max-w-none">
            {trip.brand}
          </span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Invitation sections">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-full border border-rose/20 px-3 py-2 text-sm text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="grid gap-1 border-t border-white/60 px-4 py-3 lg:hidden"
          aria-label="Mobile invitation sections"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-3 text-ink hover:bg-white/50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
