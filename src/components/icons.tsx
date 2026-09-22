import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3v18M5 6.5l14 11M19 6.5 5 17.5M4 12h16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 13.5 21 9l-3.2 8.4L12 15l-3.6 2.4.4-3.8L3 13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CabinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 12.5 12 5l8 7.5V20H4v-7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 17.5 4 21l4.2-1.4A8.5 8.5 0 1 0 6 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CakeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 13c1.4 0 1.4-1.4 2.8-1.4S9.2 13 10.6 13s1.4-1.4 2.8-1.4 1.4 1.4 2.8 1.4 1.4-1.4 2.8-1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M5 13v6h14v-6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

export function SnowmobileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 16h11l5-6M8 16 6 10h6l3 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 20s-7-4.4-7-9.2C5 8 7 6.3 9.2 6.3c1.3 0 2.3.6 2.8 1.6.5-1 1.5-1.6 2.8-1.6C17 6.3 19 8 19 10.8 19 15.6 12 20 12 20Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 72 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M36 20C28 8 12 6 6 14c-4 5 2 12 14 10 4-.6 8-2 16-4 8 2 12 3.4 16 4 12 2 18-5 14-10-6-8-22-6-30 6Z"
        fill="#E79AAF"
      />
      <path
        d="M36 20c-3-8 2-14 8-12 4 1.2 5 6 2 12-3 0-7 0-10 0Z"
        fill="#F7C9D4"
      />
      <path
        d="M36 20c3-8-2-14-8-12-4 1.2-5 6-2 12 3 0 7 0 10 0Z"
        fill="#F7C9D4"
      />
      <circle cx="36" cy="20" r="4.2" fill="#C4897B" />
      <path d="M33 24c2 7 4 7 6 0" stroke="#D9869C" strokeWidth="2.4" />
    </svg>
  );
}

export const dayIcons = {
  birthday: CakeIcon,
  snowmobile: SnowmobileIcon,
  snow: SnowflakeIcon,
  travel: PlaneIcon,
  cabin: CabinIcon,
  chat: ChatIcon,
};
