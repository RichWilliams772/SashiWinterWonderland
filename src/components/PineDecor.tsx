export function PineDecor() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full text-[#c4897b]/40"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 220 70 150l40 30 80-90 50 40 90-80 40 36 70-70 60 50 80-86 55 44 75-60 50 38 90-78 40 30 80-70 45 40 85-88V220H0Z"
        opacity="0.18"
      />
      <g fill="#7a4554" opacity="0.28">
        <path d="M90 220 130 96l40 124Z" />
        <path d="M210 220 260 70l50 150Z" />
        <path d="M340 220 372 128l32 92Z" />
        <path d="M620 220 680 54l60 166Z" />
        <path d="M860 220 910 88l50 132Z" />
        <path d="M1120 220 1180 46l60 174Z" />
        <path d="M1320 220 1360 110l40 110Z" />
      </g>
    </svg>
  );
}

export function Starfield() {
  const stars = [
    { top: "8%", left: "12%", delay: "0s" },
    { top: "14%", left: "78%", delay: "0.6s" },
    { top: "22%", left: "32%", delay: "1.2s" },
    { top: "10%", left: "54%", delay: "1.8s" },
    { top: "18%", left: "90%", delay: "0.3s" },
    { top: "6%", left: "40%", delay: "1s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 motion-reduce:hidden" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="twinkle absolute text-champagne"
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
