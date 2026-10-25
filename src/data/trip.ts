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

const breakfastToCome = {
  title: "Breakfast",
  items: ["Breakfast at the cabin—menu to come."],
};

export const trip = {
  brand: "Sashi and Tabby’s Winter Wonderland",
  seasonEmoji: "❄️💗",
  tagline: "A Pink Winter Birthday Getaway",
  inviteLine: "You’re Invited to Sashi and Tabby’s Winter Wonderland 💌",
  revealHeadline: "Pack Your Bags, Babe.",
  revealSubheadline: "We’re Going to Winter Wonderland! ❄️",
  eventName: "Sashi and Tabby’s Winter Wonderland",
  eventSubtitle: "A Winter Birthday Getaway",
  host: "Sashi and Tabby",

  welcome:
    "Thank you for considering celebrating with us! We know this trip takes time and planning, and we truly appreciate you being part of it. We hope you can join us for a cozy winter getaway full of adventures, good food and memories together.",

  dates: {
    start: "2026-12-16",
    end: "2026-12-20",
    display: "December 16–20, 2026",
    countdownIso: "2026-12-16T00:00:00-08:00",
  },
  duration: "5 days, 4 nights",
  destination: "Suncadia / Cle Elum, Washington",

  pricing: {
    contribution: 640,
    label: "Estimated contribution",
    amountLine: "$640 per paying guest",
    includes:
      "Includes Airbnb, car rental, groceries, liquor and Saturday’s private chef dinner.",
    excluded:
      "Flights and excursions are not included. Meals out, baggage fees and personal purchases are separate.",
    estimateNote: "This is an estimate; final costs will be confirmed before payment.",
  },

  deadlines: {
    rsvp: {
      label: "RSVP Deadline",
      date: "2026-11-14",
      display: "November 14, 2026",
    },
  },

  cabin: {
    title: "Our Snowy Cabin",
    location: "Suncadia / Cle Elum, Washington",
    bookingNote:
      "Our Airbnb hasn’t been decided yet. We’ll share the final location once confirmed.",
    highlights: [
      {
        title: "Suncadia / Cle Elum",
        detail: "A winter getaway in Washington, December 16–20, 2026.",
      },
      {
        title: "Cabin still to come",
        detail: "We’ll share the final Airbnb once it is confirmed.",
      },
      {
        title: "Settle in together",
        detail: "The plan is a shared cabin for the group once the stay is chosen.",
      },
    ],
    photos: [] as readonly { src: string; alt: string; caption: string }[],
  },

  flights: {
    note: "Flights are not included in the estimated contribution. Specific flight times have not been set.",
  },

  transportation: {
    summary: "A rental car is included in the estimated contribution.",
    notes: [
      "The exact rental is still being planned and is not booked yet.",
      "Winter weather may affect driving times and the itinerary.",
    ],
  },

  itineraryNote:
    "Activities are tentative and depend on reservations and weather. Nothing listed here is booked yet.",

  itinerary: [
    {
      id: "wednesday",
      dateLabel: "Wednesday, December 16",
      weekday: "Wednesday",
      theme: "Arrival & Settle In",
      icon: "travel",
      subtitle: "Land, unwind, and start the trip together",
      items: [
        { text: "Arrive in Washington and settle into the cabin" },
        { text: "Taco night with vegan options" },
        { text: "Games and hot-tub time" },
      ],
    },
    {
      id: "thursday",
      dateLabel: "Thursday, December 17",
      weekday: "Thursday",
      theme: "Winter Fun",
      icon: "snow",
      subtitle: "A snowy day, then dinner at the cabin",
      items: [
        { text: "Breakfast at the cabin" },
        { text: "Nordic skiing, snow tubing and ice skating" },
        {
          text: "Chicken-and-shrimp Alfredo dinner with Caesar salad, garlic bread and vegan options",
        },
        { text: "Cabin games and relaxation" },
      ],
    },
    {
      id: "friday",
      dateLabel: "Friday, December 18",
      weekday: "Friday",
      theme: "Snow Adventures & Christmas PJs",
      icon: "snowmobile",
      subtitle: "Mountain plans, then pajamas and cocoa",
      items: [
        { text: "Breakfast at the cabin" },
        { text: "Snowmobiling and sleigh rides near Suncadia" },
        { text: "Homemade pizza night with vegan options" },
        { text: "Christmas PJs, group pictures, s’mores and hot chocolate" },
      ],
    },
    {
      id: "saturday",
      dateLabel: "Saturday, December 19",
      weekday: "Saturday",
      theme: "Leavenworth & Birthday Celebration",
      icon: "birthday",
      subtitle: "The birthday celebration",
      items: [
        { text: "Breakfast at the cabin" },
        { text: "Alpine coaster and downtown Leavenworth" },
        { text: "Shopping, pictures and Christmas lights" },
        {
          text: "Return to the cabin for birthday pictures, a private chef dinner, cake, music and games",
        },
      ],
    },
    {
      id: "sunday",
      dateLabel: "Sunday, December 20",
      weekday: "Sunday",
      theme: "Heading Home",
      icon: "travel",
      subtitle: "A gentle send-off",
      items: [
        { text: "Breakfast at the cabin" },
        { text: "Pack, clean up and travel to the airport" },
      ],
    },
  ] satisfies ItineraryDay[],

  menu: {
    title: "What’s Cooking? 🍽️",
    lunchNote: "Meals out are separate from the estimated contribution.",
    days: [
      {
        id: "wednesday",
        dateLabel: "Wednesday, December 16",
        breakfast: null,
        dinner: {
          title: "Taco Night",
          items: ["Taco night with vegan options"],
        },
        treats: null,
      },
      {
        id: "thursday",
        dateLabel: "Thursday, December 17",
        breakfast: breakfastToCome,
        dinner: {
          title: "Cabin Dinner",
          items: [
            "Chicken-and-shrimp Alfredo",
            "Caesar salad",
            "Garlic bread",
            "Vegan options",
          ],
        },
        treats: null,
      },
      {
        id: "friday",
        dateLabel: "Friday, December 18",
        breakfast: breakfastToCome,
        dinner: {
          title: "Pizza Night",
          items: ["Homemade pizza with vegan options"],
        },
        treats: {
          title: "Evening Treats",
          items: ["S’mores", "Hot chocolate"],
        },
      },
      {
        id: "saturday",
        dateLabel: "Saturday, December 19",
        featured: true,
        breakfast: breakfastToCome,
        dinner: {
          title: "Private Chef Dinner",
          items: [
            "Lamb chops",
            "Salmon",
            "Tuscan Garden Penne — vegetarian entrée",
            "Mac and cheese",
            "Herb-baked potatoes",
            "Caesar salad",
            "Bread",
            "Nothing Bundt Cakes for dessert",
          ],
        },
        treats: null,
      },
      {
        id: "sunday",
        dateLabel: "Sunday, December 20",
        breakfast: breakfastToCome,
        dinner: null,
        treats: null,
      },
    ],
  },

  dressCode: [
    {
      day: "Wednesday",
      title: "Arrival Day",
      look: "Comfortable travel layers",
      detail: "Easy layers for the trip to the cabin.",
    },
    {
      day: "Thursday",
      title: "Winter Activities",
      look: "Warm snow-day layers",
      detail: "Dress for time outside. These activities are still tentative.",
    },
    {
      day: "Friday",
      title: "Christmas PJs",
      look: "Winter layers, then Christmas pajamas",
      detail: "Bring Christmas PJs for group pictures, s’mores and hot chocolate.",
    },
    {
      day: "Saturday",
      title: "Birthday Celebration",
      look: "Something you love for pictures",
      detail: "Saturday is the birthday celebration, in Leavenworth and back at the cabin.",
    },
    {
      day: "Sunday",
      title: "Travel Day",
      look: "Comfortable travel outfit",
      detail: "Easy layers for the airport.",
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
          "Christmas pajamas",
          "Cozy lounge clothes",
          "Slippers or cabin socks",
          "Swimsuit, in case we have hot-tub time",
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
      id: "whatsapp",
      title: "WhatsApp Group",
      detail: "Join the group chat",
      url: "https://chat.whatsapp.com/H454ZFUMlOmFOis1gmKCXa?s=cl&p=i&mlu=4&ilr=4",
      icon: "chat" as const,
    },
  ],

  whatsapp: {
    label: "Join the Group Chat 💬",
    url: "https://chat.whatsapp.com/H454ZFUMlOmFOis1gmKCXa?s=cl&p=i&mlu=4&ilr=4",
  },

  rsvp: {
    heading: "Will You Join Us? 💌",
    deadlineLine: "Please RSVP by November 14, 2026.",
    success:
      "Your RSVP is in. We can’t wait to see you — join the group chat so you don’t miss a thing.",
    setupIncomplete:
      "RSVP setup is still being finished. Your response was not saved yet. Please message Sashi or Tabby directly or try again after setup is complete.",
  },

  closing: {
    message:
      "Snowflakes, birthday wishes, and memories together. We can’t wait to celebrate with you.",
    signoff: "With love, Sashi and Tabby 💌",
  },

  storageKey: "sashi-wonderland-opened",
} as const;

export function getTripDetailsText() {
  const { pricing } = trip;
  return [
    trip.eventName,
    trip.dates.display,
    `${trip.duration} · ${trip.destination}`,
    "",
    trip.welcome,
    "",
    trip.cabin.bookingNote,
    "",
    `${pricing.label}: ${pricing.amountLine}`,
    pricing.includes,
    pricing.excluded,
    pricing.estimateNote,
    "",
    `${trip.deadlines.rsvp.label}: ${trip.deadlines.rsvp.display}`,
    "",
    trip.itineraryNote,
    trip.flights.note,
    trip.transportation.summary,
  ].join("\n");
}
