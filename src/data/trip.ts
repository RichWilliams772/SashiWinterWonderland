export type AttendingOption = "yes" | "no" | "maybe";

export type ItineraryBlock = {
  label: string;
  text: string;
};

export type ItineraryDay = {
  id: string;
  dateLabel: string;
  weekday: string;
  theme: string;
  icon: "birthday" | "snowmobile" | "snow" | "travel";
  subtitle: string;
  blocks: ItineraryBlock[];
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
    "This is our tentative plan! Excursions are optional and paid separately from the estimated $640 contribution. Activities and timing may change with reservations, weather and road conditions.",

  itinerary: [
    {
      id: "wednesday",
      dateLabel: "Wednesday, December 16",
      weekday: "Wednesday",
      theme: "Arrival & Settle In",
      icon: "travel",
      subtitle: "Arrive, tacos, and hot-tub time",
      blocks: [
        {
          label: "Afternoon",
          text: "Arrive in Washington, travel to the Airbnb and settle in.",
        },
        {
          label: "Evening",
          text: "Homemade taco dinner with vegan options, games and hot-tub time.",
        },
        { label: "Wear", text: "Comfortable travel layers." },
        { label: "Meals", text: "Dinner is included." },
      ],
    },
    {
      id: "thursday",
      dateLabel: "Thursday, December 17",
      weekday: "Thursday",
      theme: "Winter Fun",
      icon: "snow",
      subtitle: "Winter activities, then cabin dinner",
      blocks: [
        {
          label: "Morning",
          text: "Breakfast at the cabin, followed by winter activities.",
        },
        {
          label: "Afternoon",
          text: "Nordic skiing, snow tubing and ice skating, with a lunch break. Activity order and locations are still being confirmed.",
        },
        {
          label: "Evening",
          text: "Return for chicken-and-shrimp Alfredo, Caesar salad and garlic bread, with vegan options. Relax with games and hot-tub time.",
        },
        {
          label: "Bring",
          text: "Waterproof winter clothing, gloves, warm socks and snow boots.",
        },
        {
          label: "Meals",
          text: "Breakfast and dinner are included. Plan to purchase lunch separately.",
        },
      ],
    },
    {
      id: "friday",
      dateLabel: "Friday, December 18",
      weekday: "Friday",
      theme: "Snow Adventures & Christmas PJs",
      icon: "snowmobile",
      subtitle: "Snow plans, then Christmas PJs",
      blocks: [
        {
          label: "Morning",
          text: "Breakfast at the cabin, then snowmobiling near Suncadia.",
        },
        {
          label: "Afternoon",
          text: "Lunch out and a sleigh ride near Suncadia. Activity order depends on reservations.",
        },
        {
          label: "Evening",
          text: "Homemade pizza with vegan options, Christmas PJ pictures, s’mores, hot chocolate and games.",
        },
        {
          label: "Bring",
          text: "Warm waterproof layers for excursions and Christmas pajamas for the evening.",
        },
        {
          label: "Meals",
          text: "Breakfast and dinner are included. Lunch is separate.",
        },
      ],
    },
    {
      id: "saturday",
      dateLabel: "Saturday, December 19",
      weekday: "Saturday",
      theme: "Leavenworth & Birthday Celebration",
      icon: "birthday",
      subtitle: "Leavenworth, then the birthday celebration",
      blocks: [
        {
          label: "Morning",
          text: "Breakfast at the cabin. Tentatively leave around 11 AM.",
        },
        {
          label: "Afternoon",
          text: "Alpine coaster first, followed by lunch out, downtown shopping and pictures.",
        },
        {
          label: "Evening",
          text: "Enjoy the Christmas lights, tentatively leave Leavenworth around 6 PM and return to the Airbnb around 8 PM, depending on road conditions.",
        },
        {
          label: "Birthday celebration",
          text: "Get ready for birthday pictures, a private chef buffet dinner, Nothing Bundt Cakes, music and games. Dinner time is still being confirmed.",
        },
        {
          label: "Bring",
          text: "Warm walking clothes and waterproof boots; have a birthday dinner outfit ready at the cabin.",
        },
        {
          label: "Meals",
          text: "Breakfast and chef dinner are included. Lunch and shopping are separate.",
        },
      ],
    },
    {
      id: "sunday",
      dateLabel: "Sunday, December 20",
      weekday: "Sunday",
      theme: "Heading Home",
      icon: "travel",
      subtitle: "Breakfast, checkout, and the airport",
      blocks: [
        { label: "Morning", text: "Breakfast, packing and cleanup." },
        {
          label: "Later",
          text: "Check out, return the rental and head to the airport.",
        },
        { label: "Wear", text: "Comfortable travel layers." },
        { label: "Meals", text: "Breakfast is included." },
      ],
      notes: [
        "Departure timing will be shared once flights and checkout arrangements are confirmed.",
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

  rsvp: {
    heading: "Will You Join Us? 💌",
    deadlineLine: "Please RSVP by November 14, 2026.",
    success: "Your RSVP is in. We can’t wait to see you.",
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
