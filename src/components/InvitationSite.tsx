import { Cabin } from "@/components/Cabin";
import { Closing } from "@/components/Closing";
import { DressCode } from "@/components/DressCode";
import { Flights } from "@/components/Flights";
import { FloatingActions } from "@/components/FloatingActions";
import { HeroInvitation } from "@/components/HeroInvitation";
import { Itinerary } from "@/components/Itinerary";
import { Menu } from "@/components/Menu";
import { Packing } from "@/components/Packing";
import { PineDecor, Starfield } from "@/components/PineDecor";
import { Pricing } from "@/components/Pricing";
import { RSVPForm } from "@/components/RSVPForm";
import { SiteHeader } from "@/components/SiteHeader";
import { Snowfall } from "@/components/Snowfall";
import { Transportation } from "@/components/Transportation";
import { TripOverview } from "@/components/TripOverview";
import { trip } from "@/data/trip";

export function InvitationSite() {
  return (
    <div className="wonderland-bg relative min-h-dvh pb-32 text-ink md:pb-12">
      <Snowfall />
      <Starfield />
      <PineDecor />
      <a
        href="#trip"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2"
      >
        Skip to trip details
      </a>
      <SiteHeader />
      <main>
        <HeroInvitation />
        <TripOverview />
        <Pricing />
        <Cabin />
        <Flights />
        <Transportation />
        <Itinerary />
        <Menu />
        <Packing />
        <DressCode />
        <RSVPForm />
        <Closing />
      </main>
      <footer className="relative px-4 pb-10 text-center text-xs text-ink-soft">
        {trip.brand} · {trip.dates.display}
      </footer>
      <FloatingActions />
    </div>
  );
}
