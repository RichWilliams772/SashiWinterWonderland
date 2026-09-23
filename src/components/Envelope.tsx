"use client";

import { BowIcon } from "@/components/icons";

type EnvelopeProps = {
  isOpen: boolean;
  onOpen?: () => void;
};

export function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <div className="envelope-scene">
      <div className="envelope-bow" aria-hidden="true">
        <BowIcon className="h-auto w-full" />
      </div>
      <div
        className={`envelope mx-auto ${isOpen ? "is-open" : ""}`}
        onClick={isOpen ? undefined : onOpen}
      >
        <span className="mini-card flex items-center justify-center px-4 text-center" aria-hidden="true">
          <span className="font-display text-lg italic leading-tight text-rose">
            Sashi’s Wonderland
          </span>
        </span>
        <span className="envelope-pocket">
          <span className="envelope-lining" />
        </span>
        <span className="envelope-flap" aria-hidden="true">
          <span className="envelope-flap-face" />
          <span className="envelope-flap-back" />
        </span>
        <span className={`wax-seal ${isOpen ? "" : "seal-pulse"}`} aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-full w-full p-2 text-ivory">
            <path
              d="M24 8v32M12 14l24 20M36 14 12 34M8 24h32"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="4" fill="#fff6f0" />
          </svg>
        </span>
      </div>
    </div>
  );
}
