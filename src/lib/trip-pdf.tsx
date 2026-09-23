import {
  Document,
  Font,
  G,
  Line,
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
  rose: "#B76E79",
  ink: "#5A2D3A",
  inkSoft: "#7A4554",
  white: "#FFFDFB",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.ivory,
    color: colors.ink,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.35,
    paddingTop: 38,
    paddingBottom: 44,
    paddingHorizontal: 42,
  },
  frameTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 7,
    backgroundColor: colors.blush,
  },
  frameBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 7,
    backgroundColor: colors.blush,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.blush,
  },
  title: {
    fontFamily: "Times-Bold",
    fontSize: 27,
    color: colors.ink,
    textAlign: "center",
    lineHeight: 1.12,
  },
  titleMeta: {
    fontFamily: "Times-Italic",
    fontSize: 11.5,
    color: colors.inkSoft,
    textAlign: "center",
    marginTop: 3,
  },
  section: {
    marginBottom: 11,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11.5,
    color: colors.rose,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.blush,
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  priceLabel: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 9.5,
    color: colors.ink,
    paddingRight: 8,
  },
  priceAmount: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    color: colors.ink,
    textAlign: "right",
  },
  muted: {
    fontSize: 8.5,
    lineHeight: 1.35,
    color: colors.inkSoft,
    marginTop: 3,
  },
  deadlineRow: {
    flexDirection: "row",
  },
  deadlineCol: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  deadlineGap: {
    marginRight: 7,
  },
  deadlineLabel: {
    fontSize: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.rose,
  },
  deadlineDate: {
    fontFamily: "Times-Bold",
    fontSize: 11.5,
    color: colors.ink,
    marginTop: 2,
  },
  day: {
    backgroundColor: colors.white,
    borderColor: colors.blush,
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  dayDate: {
    fontSize: 7.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.rose,
  },
  dayTheme: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    color: colors.ink,
    marginTop: 1,
    marginBottom: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
  },
  time: {
    width: 70,
    fontSize: 8,
    color: colors.rose,
    paddingTop: 1,
  },
  itemBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  itemText: {
    fontSize: 9,
    lineHeight: 1.3,
    color: colors.ink,
  },
  itemNote: {
    fontSize: 8,
    lineHeight: 1.3,
    color: colors.inkSoft,
    marginTop: 1,
  },
  extraLabel: {
    fontSize: 7.5,
    letterSpacing: 0.9,
    textTransform: "uppercase",
    color: colors.rose,
    marginTop: 5,
    marginBottom: 1,
  },
  footerLeft: {
    position: "absolute",
    left: 42,
    bottom: 16,
    fontFamily: "Helvetica",
    fontSize: 8,
    color: colors.ink,
  },
  footerRight: {
    position: "absolute",
    right: 42,
    bottom: 16,
    fontFamily: "Helvetica",
    fontSize: 8,
    color: colors.ink,
  },
});

function pdfSafe(value: string) {
  return value
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/[⇄↔→←]/g, " to ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function Snowflake({
  top,
  left,
  right,
  size,
}: {
  top: number;
  left?: number;
  right?: number;
  size: number;
}) {
  return (
    <Svg
      fixed
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ position: "absolute", top, left, right }}
    >
      <G
        stroke={colors.blushDeep}
        strokeWidth="1.15"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      >
        <Line x1="12" y1="2.2" x2="12" y2="21.8" />
        <Line x1="2.2" y1="12" x2="21.8" y2="12" />
        <Line x1="5" y1="5" x2="19" y2="19" />
        <Line x1="19" y1="5" x2="5" y2="19" />
        <Line x1="9.4" y1="4.2" x2="14.6" y2="4.2" />
        <Line x1="9.4" y1="19.8" x2="14.6" y2="19.8" />
        <Line x1="4.2" y1="9.4" x2="4.2" y2="14.6" />
        <Line x1="19.8" y1="9.4" x2="19.8" y2="14.6" />
      </G>
    </Svg>
  );
}

function PageMarks({ pageLabel }: { pageLabel: string }) {
  return (
    <>
      <View style={styles.frameTop} fixed />
      <View style={styles.frameBottom} fixed />
      <Snowflake top={14} left={12} size={14} />
      <Snowflake top={16} right={12} size={12} />
      <Text style={styles.footerLeft} fixed>
        {pdfSafe(trip.eventName)}  |  {pdfSafe(trip.destination)}
      </Text>
      <Text style={styles.footerRight} fixed>
        {pageLabel}
      </Text>
    </>
  );
}

function DayCard({
  day,
}: {
  day: (typeof trip.itinerary)[number];
}) {
  const gameLineup = day.extras?.find((extra) => extra.title === "Game Night Lineup");

  return (
    <View wrap={false} style={styles.day}>
      <Text style={styles.dayDate}>{pdfSafe(day.dateLabel)}</Text>
      <Text style={styles.dayTheme}>{pdfSafe(day.theme)}</Text>
      {day.items.map((item, index) => (
        <View key={`${day.id}-${index}`} style={styles.item}>
          <Text style={styles.time}>
            {"time" in item && item.time ? pdfSafe(item.time) : "•"}
          </Text>
          <View style={styles.itemBody}>
            <Text style={styles.itemText}>{pdfSafe(item.text)}</Text>
            {"note" in item && item.note ? (
              <Text style={styles.itemNote}>{pdfSafe(item.note)}</Text>
            ) : null}
          </View>
        </View>
      ))}
      {gameLineup ? (
        <View>
          <Text style={styles.extraLabel}>{pdfSafe(gameLineup.title)}</Text>
          <Text style={styles.itemText}>{gameLineup.items.map(pdfSafe).join("  ·  ")}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function TripDetailsPdf() {
  const { pricing, deadlines } = trip;
  const thursday = trip.itinerary[0];
  const laterDays = trip.itinerary.slice(1);

  return (
    <Document
      title={`${pdfSafe(trip.eventName)} Trip Details`}
      author={trip.host}
      subject={`${pdfSafe(trip.eventName)} — ${pdfSafe(trip.dates.display)}`}
    >
      <Page size="LETTER" style={styles.page} wrap>
        <PageMarks pageLabel="Page 1 of 2" />

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{pdfSafe(trip.eventName)}</Text>
          <Text style={styles.titleMeta}>{pdfSafe(trip.dates.display)}</Text>
          <Text style={styles.titleMeta}>{pdfSafe(trip.destination)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost</Text>
          <View style={styles.card}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{pdfSafe(pricing.sharedLabel)}</Text>
              <Text style={styles.priceAmount}>
                {formatUsd(pricing.sharedContribution)} per person
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{pdfSafe(pricing.flightLabel)}</Text>
              <Text style={styles.priceAmount}>
                {formatUsd(pricing.estimatedFlight)} per person
              </Text>
            </View>
            <View style={[styles.priceRow, { marginBottom: 0 }]}>
              <Text style={styles.priceLabel}>{pdfSafe(pricing.totalLabel)}</Text>
              <Text style={styles.priceAmount}>
                {formatUsd(pricing.estimatedBaseTotal)} per person
              </Text>
            </View>
            <Text style={styles.muted}>{pdfSafe(pricing.includes)}</Text>
            <Text style={styles.muted}>
              Lunches out, baggage fees, and optional excursions are separate.
            </Text>
            <Text style={styles.muted}>
              The {formatUsd(pricing.estimatedFlight)} round-trip flight is an estimate.
              Flight prices may fluctuate.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Deadlines</Text>
          <View style={styles.deadlineRow}>
            <View style={[styles.card, styles.deadlineCol, styles.deadlineGap]}>
              <Text style={styles.deadlineLabel}>{pdfSafe(deadlines.rsvp.label)}</Text>
              <Text style={styles.deadlineDate}>{pdfSafe(deadlines.rsvp.display)}</Text>
            </View>
            <View style={[styles.card, styles.deadlineCol]}>
              <Text style={styles.deadlineLabel}>{pdfSafe(deadlines.payment.label)}</Text>
              <Text style={styles.deadlineDate}>{pdfSafe(deadlines.payment.display)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Four-Day Itinerary</Text>
          <DayCard day={thursday} />
        </View>
      </Page>

      <Page size="LETTER" style={styles.page} wrap>
        <PageMarks pageLabel="Page 2 of 2" />
        {laterDays.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}
      </Page>
    </Document>
  );
}
