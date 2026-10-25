import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Nunito } from "next/font/google";
import { trip } from "@/data/trip";
import "./globals.css";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: `${trip.eventName} ${trip.seasonEmoji}`,
  description: `You’re invited to ${trip.eventName} in ${trip.destination}. ${trip.dates.display}.`,
  openGraph: {
    title: trip.eventName,
    description: `${trip.welcome} ${trip.dates.display} in ${trip.destination}.`,
    images: ["/images/invitation-card.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6c2ce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${display.variable} ${sans.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
