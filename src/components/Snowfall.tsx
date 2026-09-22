"use client";

const flakes = [
  { left: "4%", delay: "0s", duration: "14s", size: "0.7rem", drift: "12px" },
  { left: "11%", delay: "2s", duration: "16s", size: "1rem", drift: "-18px" },
  { left: "18%", delay: "5s", duration: "13s", size: "0.55rem", drift: "8px" },
  { left: "26%", delay: "1s", duration: "18s", size: "0.85rem", drift: "-10px" },
  { left: "33%", delay: "7s", duration: "15s", size: "1.15rem", drift: "20px" },
  { left: "41%", delay: "3s", duration: "17s", size: "0.6rem", drift: "-14px" },
  { left: "49%", delay: "6s", duration: "14s", size: "0.9rem", drift: "6px" },
  { left: "57%", delay: "0.8s", duration: "19s", size: "0.7rem", drift: "-22px" },
  { left: "64%", delay: "4s", duration: "15s", size: "1.05rem", drift: "16px" },
  { left: "72%", delay: "8s", duration: "13s", size: "0.5rem", drift: "-8px" },
  { left: "79%", delay: "2.4s", duration: "16s", size: "0.95rem", drift: "14px" },
  { left: "86%", delay: "5.5s", duration: "18s", size: "0.65rem", drift: "-16px" },
  { left: "93%", delay: "1.6s", duration: "14s", size: "0.8rem", drift: "10px" },
  { left: "8%", delay: "9s", duration: "20s", size: "0.45rem", drift: "18px" },
  { left: "54%", delay: "11s", duration: "17s", size: "0.75rem", drift: "-12px" },
];

export function Snowfall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden="true">
      {flakes.map((flake, index) => (
        <span
          key={index}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
            ["--drift" as string]: flake.drift,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}
