import {
  Circle,
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatUsd, trip } from "@/data/trip";

Font.registerHyphenationCallback((word) => [word]);

const colors = {
  ivory: "#FFF8F3",
  blush: "#F6C2CE",
  blushDeep: "#E79AAF",
  icy: "#FDE8F0",
  champagne: "#F3E4C8",
  rose: "#B76E79",
  ink: "#5A2D3A",
  inkSoft: "#7A4554",
  rosegold: "#C4897B",
  white: "#FFFDFB",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.ivory,
    color: colors.ink,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
    paddingTop: 46,
    paddingBottom: 50,
    paddingHorizontal: 42,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blush,
    paddingBottom: 12,
    marginBottom: 14,
  },
  kicker: {
    color: colors.rose,
    fontSize: 8,
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Times-Bold",
    fontSize: 28,
    color: colors.ink,
    marginTop: 4,
  },
  subtitle: {
    fontFamily: "Times-Italic",
    fontSize: 13,
    color: colors.inkSoft,
    marginTop: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 16,
    color: colors.ink,
    marginBottom: 6,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.blush,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  featuredCard: {
    backgroundColor: colors.blush,
    borderColor: colors.blushDeep,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  colGap: {
    marginRight: 8,
  },
  label: {
    color: colors.rose,
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  amount: {
    fontFamily: "Times-Bold",
    fontSize: 20,
    marginTop: 2,
  },
  hint: {
    color: colors.inkSoft,
    fontSize: 8.5,
    marginTop: 2,
  },
  body: {
    color: colors.ink,
    fontSize: 10,
  },
  muted: {
    color: colors.inkSoft,
    fontSize: 9,
    marginTop: 4,
  },
  dayTitle: {
    fontFamily: "Times-Bold",
    fontSize: 14,
    color: colors.ink,
  },
  dayTheme: {
    fontFamily: "Times-Italic",
    fontSize: 11,
    color: colors.inkSoft,
    marginBottom: 6,
  },
  item: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  time: {
    width: 78,
    color: colors.rose,
    fontSize: 9,
  },
  itemText: {
    flex: 1,
    fontSize: 10,
  },
  note: {
    color: colors.inkSoft,
    fontSize: 8.5,
    marginTop: 1,
  },
  extraTitle: {
    color: colors.rose,
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 3,
  },
  link: {
    color: colors.rose,
    textDecoration: "underline",
  },
  footer: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 22,
    borderTopWidth: 1,
    borderTopColor: colors.blush,
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    color: colors.inkSoft,
    fontSize: 8,
  },
});

function Flake({
  top,
  left,
  right,
  size,
}: {
  top?: number;
  left?: number;
  right?: number;
  size: number;
}) {
  return (
    <Svg fixed width={size} height={size} style={{ position: "absolute", top, left, right }}>
      <Circle cx={size / 2} cy={size / 2} r={size / 5} fill={colors.blushDeep} fillOpacity={0.35} />
      <Circle cx={size / 2} cy={size / 6} r={size / 9} fill={colors.blush} fillOpacity={0.45} />
      <Circle cx={size / 2} cy={(size * 5) / 6} r={size / 9} fill={colors.blush} fillOpacity={0.45} />
      <Circle cx={size / 6} cy={size / 2} r={size / 9} fill={colors.blush} fillOpacity={0.45} />
      <Circle cx={(size * 5) / 6} cy={size / 2} r={size / 9} fill={colors.blush} fillOpacity={0.45} />
    </Svg>
  );
}

function Flakes() {
  return (
    <>
      <Flake top={14} left={16} size={12} />
      <Flake top={16} right={20} size={10} />
      <Flake top={34} left={118} size={8} />
      <Flake top={720} right={52} size={11} />
    </>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        {trip.eventName}  ·  {trip.destination}
      </Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function PdfLink({ href, children }: { href: string; children: string }) {
  return (
    <Link src={href}>
      <Text style={styles.link}>{children}</Text>
    </Link>
  );
}

function FlightCard({
  flight,
}: {
  flight: typeof trip.flights.outbound | typeof trip.flights.return;
}) {
  return (
    <View style={styles.card} wrap={false}>
      <Text style={styles.label}>{flight.label}</Text>
      <Text style={styles.dayTitle}>{flight.day}</Text>
      <Text style={styles.body}>{flight.airline}</Text>
      <Text style={styles.body}>
        {flight.from} → {flight.to}
      </Text>
      <Text style={styles.muted}>
        Depart {flight.depart}  ·  Arrive {flight.arrive}
      </Text>
    </View>
  );
}

export function TripDetailsPdf() {
  const { pricing, deadlines, flights, cabin, menu } = trip;

  return (
    <Document
      title={`${trip.eventName} Trip Details`}
      author={trip.host}
      subject={`${trip.eventName} — ${trip.dates.display}`}
    >
      <Page size="LETTER" style={styles.page} wrap>
        <Flakes />
        <Footer />

        <View style={styles.header}>
          <Text style={styles.kicker}>{trip.tagline}</Text>
          <Text style={styles.title}>{trip.eventName}</Text>
          <Text style={styles.subtitle}>
            {trip.dates.display}  ·  {trip.destination}  ·  {trip.duration}
          </Text>
        </View>

        <View style={styles.section}>
          <SectionTitle>What to Plan For</SectionTitle>
          <View style={styles.row}>
            <View style={[styles.card, styles.col, styles.colGap]} wrap={false}>
              <Text style={styles.label}>{pricing.sharedLabel}</Text>
              <Text style={styles.amount}>{formatUsd(pricing.sharedContribution)}</Text>
              <Text style={styles.hint}>per person</Text>
              <Text style={styles.muted}>{pricing.includes}</Text>
            </View>
            <View style={[styles.card, styles.col]} wrap={false}>
              <Text style={styles.label}>{pricing.flightLabel}</Text>
              <Text style={styles.amount}>{formatUsd(pricing.estimatedFlight)}</Text>
              <Text style={styles.hint}>per person · American Airlines · MIA ⇄ SEA</Text>
            </View>
          </View>
          <View style={styles.featuredCard} wrap={false}>
            <Text style={styles.label}>{pricing.totalLabel}</Text>
            <Text style={styles.amount}>{formatUsd(pricing.estimatedBaseTotal)}</Text>
            <Text style={styles.hint}>per person · contribution + airfare</Text>
          </View>
          <Text style={styles.muted}>{pricing.footnote}</Text>
          <Text style={styles.muted}>{flights.estimatedFareNote}</Text>
          <Text style={styles.muted}>{pricing.planningNote}</Text>
        </View>

        <View style={styles.section} wrap={false}>
          <View style={styles.row}>
            <View style={[styles.card, styles.col, styles.colGap]}>
              <Text style={styles.label}>{deadlines.rsvp.label}</Text>
              <Text style={styles.dayTitle}>{deadlines.rsvp.display}</Text>
            </View>
            <View style={[styles.card, styles.col]}>
              <Text style={styles.label}>{deadlines.payment.label}</Text>
              <Text style={styles.dayTitle}>{deadlines.payment.display}</Text>
            </View>
          </View>
          <Text style={styles.muted}>{pricing.paymentPlaceholder}</Text>
        </View>

        <View style={styles.section} wrap={false}>
          <SectionTitle>Stay & Group Chat</SectionTitle>
          <View style={styles.card}>
            <Text style={styles.body}>
              {cabin.title} — {cabin.location}
            </Text>
            <Text style={styles.muted}>{cabin.poolNote}</Text>
            <Text style={{ marginTop: 6 }}>
              <PdfLink href={cabin.airbnbUrl}>{cabin.airbnbLabel}</PdfLink>
            </Text>
            <Text style={{ marginTop: 4 }}>
              <PdfLink href={trip.whatsapp.url}>{trip.whatsapp.label}</PdfLink>
            </Text>
            <Text style={styles.muted}>{trip.playlist.pdfNote}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle>Flights & Airport Times</SectionTitle>
          <FlightCard flight={flights.outbound} />
          <FlightCard flight={flights.return} />
          <Text style={styles.muted}>{flights.localTimesNote}</Text>
          <Text style={{ marginTop: 6 }}>
            <PdfLink href={flights.searchUrl}>{flights.searchLabel}</PdfLink>
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <SectionTitle>Getting Around</SectionTitle>
          <View style={styles.card}>
            <Text style={styles.body}>{trip.transportation.summary}</Text>
            {trip.transportation.notes.map((note) => (
              <Text key={note} style={styles.muted}>
                {note}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section} break>
          <SectionTitle>Four-Day Itinerary</SectionTitle>
          {trip.itinerary.map((day) => (
            <View key={day.id} style={styles.card} minPresenceAhead={72}>
              <Text style={styles.label}>{day.weekday}</Text>
              <Text style={styles.dayTitle}>{day.dateLabel}</Text>
              <Text style={styles.dayTheme}>
                {day.theme} — {day.subtitle}
              </Text>
              {day.items.map((item, index) => (
                <View key={`${day.id}-${index}`} style={styles.item} wrap={false}>
                  <Text style={styles.time}>{"time" in item && item.time ? item.time : "•"}</Text>
                  <View style={styles.itemText}>
                    <Text>{item.text}</Text>
                    {"note" in item && item.note ? (
                      <Text style={styles.note}>{item.note}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
              {day.extras?.map((extra) => (
                <View key={extra.title}>
                  <Text style={styles.extraTitle}>{extra.title}</Text>
                  {extra.items.map((item) => (
                    <Text key={item} style={styles.body}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ))}
              {day.notes?.map((note) => (
                <Text key={note} style={styles.muted}>
                  {note}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <SectionTitle>Winter Activities</SectionTitle>
          <View style={styles.card}>
            <Text style={styles.extraTitle}>Snowmobiling</Text>
            <Text style={styles.body}>{trip.excursions.snowmobiling.name}</Text>
            <Text style={styles.muted}>
              Optional Friday excursion, paid individually. About 6.4 miles from the Airbnb.
              Group availability, tour time, and final pricing must be confirmed.
            </Text>
            <Text style={{ marginTop: 4 }}>
              <PdfLink href={trip.excursions.snowmobiling.url}>
                Book snowmobiling
              </PdfLink>
            </Text>
            <Text style={styles.extraTitle}>Snow Tubing & Ice Skating</Text>
            <Text style={styles.body}>
              Saturday snow tubing at Suncadia, plus ice skating at Suncadia if operating.
            </Text>
            <Text style={styles.muted}>
              Ice skating is not confirmed for December 19, 2026. Availability and the
              booking link are still to be confirmed.
            </Text>
            <Text style={{ marginTop: 4 }}>
              <PdfLink href={trip.excursions.suncadia.url}>
                {trip.excursions.suncadia.name}
              </PdfLink>
            </Text>
            <Text style={styles.extraTitle}>Skiing Backup</Text>
            <Text style={styles.body}>
              If ice skating is unavailable, skiing is the backup activity.
            </Text>
            <Text style={styles.muted}>
              Skiing may require travel to a separate ski resort, plus lift tickets and
              equipment rentals. It is not included at the Airbnb or Suncadia.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle>{menu.title.replace(/🍽️\s*/g, "").trim()}</SectionTitle>
          <View style={styles.featuredCard} wrap={false}>
            <Text style={styles.body}>{menu.lunchNote}</Text>
            <Text style={styles.muted}>
              Optional excursions such as snowmobiling, tubing, and skating are paid
              individually and are separate from the shared trip contribution.
            </Text>
          </View>
          {menu.days.map((day) => (
            <View key={day.id} style={styles.card} wrap={false}>
              <Text style={styles.dayTitle}>{day.dateLabel}</Text>
              {day.breakfast ? (
                <View>
                  <Text style={styles.extraTitle}>Breakfast · {day.breakfast.title}</Text>
                  {day.breakfast.items.map((item) => (
                    <Text key={item} style={styles.body}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.muted}>No cabin breakfast planned for travel day morning.</Text>
              )}
              {day.dinner ? (
                <View>
                  <Text style={styles.extraTitle}>Dinner · {day.dinner.title}</Text>
                  {day.dinner.items.map((item) => (
                    <Text key={item} style={styles.body}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.muted}>No cabin dinner planned after we head home.</Text>
              )}
              {day.treats ? (
                <View>
                  <Text style={styles.extraTitle}>Treats · {day.treats.title}</Text>
                  {day.treats.items.map((item) => (
                    <Text key={item} style={styles.body}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <SectionTitle>Helpful Links</SectionTitle>
          <View style={styles.card}>
            {trip.links
              .filter((link) =>
                ["airbnb", "snowmobiling", "suncadia", "flights", "whatsapp"].includes(
                  link.id,
                ),
              )
              .map((link) => (
                <Text key={link.id} style={{ marginBottom: 4 }}>
                  {link.title}: <PdfLink href={link.url}>{link.detail}</PdfLink>
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <View style={styles.card}>
            <Text style={styles.body}>{trip.closing.message}</Text>
            <Text style={styles.subtitle}>{trip.closing.signoff}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
