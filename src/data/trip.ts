export type AttendingOption = "yes" | "no" | "maybe";

export type ItineraryItem = {
  time?: string;
  text: string;
  note?: string;
};

export type ItineraryDay = {
  id: string;
  dateLabel: string;
  weekday: string;
  theme: string;
  icon: "birthday" | "snowmobile" | "snow" | "travel";
  subtitle: string;
  items: ItineraryItem[];
  extras?: { title: string; items: string[] }[];
  notes?: string[];
};

export const trip = {
  brand: "Sashi’s Wonderland",
  seasonEmoji: "❄️💗",
  tagline: "A Pink Winter Birthday Getaway",
  inviteLine: "You’re Invited to Sashi’s Wonderland 💌",
  revealHeadline: "Pack Your Bags, Babe.",
  revealSubheadline: "We’re Going to Wonderland! ❄️",
  eventName: "Sashi’s Wonderland",
  eventSubtitle: "Birthday Winter Getaway",
  host: "Sashi",

  dates: {
    start: "2026-12-17",
    end: "2026-12-20",
    display: "December 17–20, 2026",
    countdownIso: "2026-12-17T08:00:00-05:00",
  },
  duration: "4 days, 3 nights",
  destination: "Cle Elum, Washington",

  pricing: {
    sharedContribution: 590,
    estimatedFlight: 674,
    estimatedBaseTotal: 1264,
    sharedLabel: "Shared Trip Contribution",
    flightLabel: "Estimated Round-Trip Flight",
    totalLabel: "Estimated Base Trip Total",
    includes:
      "Includes food and drinks, the heated pool, and transportation.",
    footnote:
      "The $590 shared trip contribution includes food and drinks, the heated pool, and transportation. The base trip total includes the shared trip contribution and estimated airfare. Lunches out, baggage fees, and optional excursions are separate.",
    planningNote:
      "The shared contribution is a planning figure and may be confirmed as remaining booking details are finalized.",
    paymentPlaceholder:
      "Payment details will be shared privately after you RSVP. Please have your contribution ready by the payment deadline.",
  },

  deadlines: {
    rsvp: {
      label: "RSVP Deadline",
      date: "2026-11-20",
      display: "November 20, 2026",
    },
    payment: {
      label: "Payment Deadline",
      date: "2026-12-01",
      display: "December 1, 2026",
    },
  },

  cabin: {
    title: "Our Snowy Cabin",
    location: "Cle Elum, Washington",
    airbnbUrl: "https://www.airbnb.com/rooms/1096282701627665132",
    airbnbLabel: "View Our Actual Airbnb 🏡",
    poolNote:
      "The heated pool is included in the $590 shared trip contribution for all three nights.",
    bookingNote:
      "The real cabin photos, house rules, and latest details live on our Airbnb listing. Please use that link for the confirmed stay.",
    highlights: [
      {
        title: "Cle Elum, Washington",
        detail: "A snowy mountain hideaway for December 17–20, 2026.",
      },
      {
        title: "Heated pool nights",
        detail: "The heated pool is included in the shared trip contribution.",
      },
      {
        title: "See the real cabin",
        detail: "Open the Airbnb listing for confirmed photos of our actual stay.",
      },
    ],
    // Add permitted Airbnb photos later as { src, alt, caption }.
    photos: [] as readonly { src: string; alt: string; caption: string }[],
  },

  flights: {
    airline: "American Airlines",
    searchUrl: "https://www.aa.com/",
    searchLabel: "Search American Airlines Flights",
    localTimesNote: "All flight times are local to their respective airports.",
    estimatedFareNote:
      "The $674 estimate is for American Airlines MIA → SEA on Thursday, 8:00 AM–12:02 PM, and SEA → MIA on Sunday, 1:02 PM–9:55 PM. Flight prices may fluctuate. Please buy at the earliest convenience.",
    outbound: {
      label: "Outbound",
      day: "Thursday, December 17",
      airline: "American Airlines",
      from: "Miami International Airport (MIA)",
      to: "Seattle–Tacoma International Airport (SEA)",
      depart: "8:00 AM",
      arrive: "12:02 PM",
    },
    return: {
      label: "Return",
      day: "Sunday, December 20",
      airline: "American Airlines",
      from: "Seattle–Tacoma International Airport (SEA)",
      to: "Miami International Airport (MIA)",
      depart: "1:02 PM",
      arrive: "9:55 PM",
    },
  },

  transportation: {
    summary:
      "Group transportation is planned via a 15-passenger rental van and is included in the $590 shared trip contribution.",
    notes: [
      "The van’s exact booking, luggage capacity, driver eligibility, rental dates, and winter-equipment requirements must still be confirmed.",
      "Winter weather and Snoqualmie Pass conditions may affect driving times and the itinerary.",
    ],
  },

  itinerary: [
    {
      id: "thursday",
      dateLabel: "Thursday, December 17",
      weekday: "Thursday",
      theme: "Sashi’s Birthday & Game Night",
      icon: "birthday",
      subtitle: "Cake, candles, and cabin chaos",
      items: [
        { time: "8:00 AM", text: "Depart Miami" },
        { time: "12:02 PM", text: "Arrive in Seattle" },
        { text: "Collect luggage and pick up the rental van" },
        { text: "Shop at Costco and Walmart" },
        { text: "Pick up my red velvet birthday cake from Nothing Bundt Cakes" },
        { text: "Stop at Total Wine & More in Tukwila" },
        { text: "Drive to our cabin in Cle Elum" },
        { text: "Unpack and get ready" },
        { text: "Birthday dinner and birthday pictures" },
        { text: "Birthday cake" },
        { text: "Birthday game night" },
      ],
      extras: [
        {
          title: "Game Night Lineup",
          items: [
            "Partner karaoke",
            "UNO",
            "Truth or Dare",
            "Never Have I Ever",
            "Do or Drink",
          ],
        },
      ],
      notes: [
        "Times after landing are approximate while we gather, shop, and drive to the cabin.",
        "End the night with music, movies, and relaxing at the cabin.",
      ],
    },
    {
      id: "friday",
      dateLabel: "Friday, December 18",
      weekday: "Friday",
      theme: "Snowmobiling & Taco Night",
      icon: "snowmobile",
      subtitle: "Mountain air, then taco toppings",
      items: [
        { text: "Breakfast at the cabin" },
        { text: "Guided snowmobiling excursion", note: "Optional · paid individually" },
        { text: "Lunch out in Cle Elum" },
        { text: "Return to the cabin and relax" },
        { text: "Build-your-own taco dinner" },
        { text: "Games, movies, and optional heated-pool time" },
      ],
      extras: [
        {
          title: "Snowmobiling",
          items: [
            "Provider: MotorToys Rentals & Tours",
            "About 6.4 miles from the Airbnb",
            "Optional activity paid for individually",
            "Group availability, tour time, and final pricing must be confirmed",
          ],
        },
      ],
      notes: [
        "Keep optional excursions separate from the shared trip contribution.",
      ],
    },
    {
      id: "saturday",
      dateLabel: "Saturday, December 19",
      weekday: "Saturday",
      theme: "Snow Day & Christmas Pajama Night",
      icon: "snow",
      subtitle: "Fresh snow, then holiday pajamas",
      items: [
        { text: "Build-your-own burrito stations for breakfast" },
        { text: "Snow tubing at Suncadia" },
        {
          text: "Ice skating at Suncadia, if operating",
          note: "Availability and booking link: to be confirmed",
        },
        {
          text: "If ice skating is unavailable, skiing is the backup activity",
          note:
            "Skiing may require travel to a separate ski resort, plus lift tickets and equipment rentals. It is not included at the Airbnb or Suncadia.",
        },
        { text: "Lunch out" },
        { text: "Holiday photos and free time" },
        { text: "Return to the cabin" },
        { text: "Change into Christmas pajamas" },
        { text: "Make-your-own pizza dinner" },
        { text: "Christmas cookie baking" },
        { text: "Hot chocolate" },
        { text: "Christmas movie marathon" },
        { text: "Optional heated-pool time" },
      ],
      notes: [
        "Snow tubing and ice skating are optional winter activities, separate from the shared trip contribution.",
        "Ice skating is not confirmed for December 19, 2026.",
      ],
    },
    {
      id: "sunday",
      dateLabel: "Sunday, December 20",
      weekday: "Sunday",
      theme: "Heading Home",
      icon: "travel",
      subtitle: "Soft goodbyes and a Seattle send-off",
      items: [
        { text: "Early breakfast and packing" },
        { time: "Approx. 7:00 AM", text: "Leave the cabin" },
        { text: "Drive to Seattle–Tacoma International Airport" },
        { text: "Refill the rental van’s gas tank before returning it" },
        { text: "Return the van" },
        { text: "Check in for the flight" },
        { time: "1:02 PM", text: "Flight departs Seattle" },
        { time: "9:55 PM", text: "Arrive in Miami" },
      ],
      notes: [
        "Winter weather and Snoqualmie Pass conditions may affect driving times and the itinerary.",
      ],
    },
  ] satisfies ItineraryDay[],

  excursions: {
    snowmobiling: {
      name: "MotorToys Rentals & Tours",
      url: "https://www.motortoyrentals.com/copy-of-snowmobile-rentals-3",
    },
    suncadia: {
      name: "Suncadia Winterfest Experiences",
      url: "https://suncadia.com/winterfest-2026-experiences/",
    },
  },

  menu: {
    title: "What’s Cooking? 🍽️",
    lunchNote: "Lunches will be eaten out and paid individually.",
    days: [
      {
        id: "thursday",
        dateLabel: "Thursday, December 17",
        breakfast: null,
        dinner: {
          title: "Birthday Dinner",
          items: [
            "Homemade chicken and shrimp Alfredo",
            "Garlic bread",
            "Caesar salad",
            "Red velvet Nothing Bundt Cake for dessert",
          ],
        },
        treats: null,
      },
      {
        id: "friday",
        dateLabel: "Friday, December 18",
        breakfast: {
          title: "Cabin Breakfast",
          items: ["Pancakes", "Scrambled eggs", "Bacon", "Fresh fruit"],
        },
        dinner: {
          title: "Taco Night",
          items: [
            "Build-your-own beef and chicken tacos",
            "Rice",
            "Taco toppings",
          ],
        },
        treats: null,
      },
      {
        id: "saturday",
        dateLabel: "Saturday, December 19",
        breakfast: {
          title: "Build-Your-Own Burrito Stations",
          items: ["Build-your-own burrito stations"],
        },
        dinner: {
          title: "Pizza Night",
          items: ["Make-your-own pizza night"],
        },
        treats: {
          title: "Christmas Movie Treats",
          items: ["Christmas cookies", "Popcorn", "Hot chocolate"],
        },
      },
      {
        id: "sunday",
        dateLabel: "Sunday, December 20",
        breakfast: {
          title: "Travel-Day Breakfast",
          items: ["Bagels", "Cereal", "Yogurt", "Fruit"],
        },
        dinner: null,
        treats: null,
      },
    ],
  },

  dressCode: [
    {
      day: "Thursday",
      title: "Cheetah Print Birthday Dinner",
      look: "Cheetah print",
      detail:
        "Thursday’s birthday dinner theme is cheetah print. Shop the Amazon picks below and come ready for cake and pictures.",
      shops: [
        {
          label: "Girls Amazon Buy",
          url: "https://a.co/d/02EFxkX4",
        },
        {
          label: "Boys Amazon Buy",
          url: "https://a.co/d/0fuMtk7H",
        },
      ],
    },
    {
      day: "Friday",
      title: "Snow & Cabin Cozy",
      look: "Warm snowmobiling clothes and cozy cabin clothes",
      detail: "Layers you can peel off after the mountain, then something soft for taco night.",
    },
    {
      day: "Saturday",
      title: "Snow Day to PJs",
      look: "Snow-day outfits followed by Christmas pajamas",
      detail: "Waterproof for the snow, then matching or mismatched holiday PJs for movie night.",
    },
    {
      day: "Sunday",
      title: "Travel Day",
      look: "Comfortable travel outfit",
      detail: "Airport-easy layers you will still love in photos at the gate.",
    },
  ],

  packing: {
    intro:
      "Washington winters can be cold, snowy, and wet. Pack for snow, chilly cabin evenings, and changing mountain weather — conditions are never guaranteed.",
    groups: [
      {
        title: "Snow & Warmth",
        items: [
          "Waterproof winter coat",
          "Insulated or waterproof snow boots",
          "Warm hat, scarf, and waterproof gloves",
          "Thermal base layers",
          "Sweaters and fleece mid-layers",
          "Warm socks (pack extras)",
        ],
      },
      {
        title: "Cabin & Evenings",
        items: [
          "Cheetah-print birthday dinner look",
          "Christmas pajamas",
          "Cozy lounge clothes",
          "Slippers or cabin socks",
          "Swimsuit for the heated pool",
          "Light robe or cover-up",
        ],
      },
      {
        title: "Travel Essentials",
        items: [
          "Photo ID and boarding pass",
          "Phone, chargers, and a portable battery",
          "Toiletries and any medications",
          "Sunglasses for snow glare",
          "Reusable water bottle",
          "A little something pretty for photos",
        ],
      },
    ],
  },

  links: [
    {
      id: "airbnb",
      title: "Our Airbnb",
      detail: "Peek at the cabin in Cle Elum",
      url: "https://www.airbnb.com/rooms/1096282701627665132",
      icon: "cabin" as const,
    },
    {
      id: "snowmobiling",
      title: "Snowmobiling",
      detail: "MotorToys Rentals & Tours",
      url: "https://www.motortoyrentals.com/copy-of-snowmobile-rentals-3",
      icon: "snowmobile" as const,
    },
    {
      id: "suncadia",
      title: "Snow Tubing & Holiday Activities",
      detail: "Suncadia Winterfest 2026",
      url: "https://suncadia.com/winterfest-2026-experiences/",
      icon: "snow" as const,
    },
    {
      id: "cheetah-girls",
      title: "Girls Amazon Buy",
      detail: "Cheetah-print birthday dinner look",
      url: "https://a.co/d/02EFxkX4",
      icon: "birthday" as const,
    },
    {
      id: "cheetah-boys",
      title: "Boys Amazon Buy",
      detail: "Cheetah-print birthday dinner look",
      url: "https://a.co/d/0fuMtk7H",
      icon: "birthday" as const,
    },
    {
      id: "flights",
      title: "American Airlines Flight Search",
      detail: "Look up MIA ⇄ SEA flights",
      url: "https://www.aa.com/",
      icon: "travel" as const,
    },
    {
      id: "whatsapp",
      title: "WhatsApp Group",
      detail: "Join the Wonderland group chat",
      url: "https://chat.whatsapp.com/H454ZFUMlOmFOis1gmKCXa?s=cl&p=i&mlu=4&ilr=4",
      icon: "chat" as const,
    },
  ],

  whatsapp: {
    label: "Join the Wonderland Group Chat 💬",
    url: "https://chat.whatsapp.com/H454ZFUMlOmFOis1gmKCXa?s=cl&p=i&mlu=4&ilr=4",
  },

  rsvp: {
    heading: "Will You Join Me in Wonderland? 💌",
    deadlineLine: "Please RSVP by November 20, 2026.",
    success:
      "Your RSVP is in, love. I can’t wait to see you in Wonderland — join the group chat so you don’t miss a thing.",
    setupIncomplete:
      "RSVP setup is still being finished. Your response was not saved yet. Please message Sashi directly or try again after setup is complete.",
  },

  closing: {
    message:
      "Snowflakes, birthday wishes, and memories with my favorite people. I can’t wait to celebrate with you in Sashi’s Wonderland. 💗❄️",
    signoff: "With love, Sashi 💌",
  },

  storageKey: "sashi-wonderland-opened",
} as const;

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getTripDetailsText() {
  const { pricing } = trip;
  return [
    `${trip.eventName} — ${trip.eventSubtitle}`,
    trip.dates.display,
    `${trip.duration} · ${trip.destination}`,
    "",
    `${pricing.sharedLabel}: ${formatUsd(pricing.sharedContribution)} per person`,
    pricing.includes,
    `${pricing.flightLabel}: ${formatUsd(pricing.estimatedFlight)} per person`,
    `${pricing.totalLabel}: ${formatUsd(pricing.estimatedBaseTotal)} per person`,
    pricing.footnote,
    trip.flights.estimatedFareNote,
    "",
    `${trip.deadlines.rsvp.label}: ${trip.deadlines.rsvp.display}`,
    `${trip.deadlines.payment.label}: ${trip.deadlines.payment.display}`,
    trip.pricing.paymentPlaceholder,
    "",
    `Outbound ${trip.flights.outbound.day}: ${trip.flights.outbound.airline} ${trip.flights.outbound.from} → ${trip.flights.outbound.to}, depart ${trip.flights.outbound.depart}, arrive ${trip.flights.outbound.arrive}`,
    `Return ${trip.flights.return.day}: ${trip.flights.return.airline} ${trip.flights.return.from} → ${trip.flights.return.to}, depart ${trip.flights.return.depart}, arrive ${trip.flights.return.arrive}`,
    trip.flights.localTimesNote,
    "",
    `Airbnb: ${trip.cabin.airbnbUrl}`,
    `WhatsApp: ${trip.whatsapp.url}`,
    `American Airlines: ${trip.flights.searchUrl}`,
  ].join("\n");
}
