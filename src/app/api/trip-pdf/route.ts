import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { TRIP_PDF_FILENAME } from "@/lib/trip-pdf-filename";
import { TripDetailsPdf } from "@/lib/trip-pdf";

export const runtime = "nodejs";

export async function GET() {
  const buffer = await renderToBuffer(createElement(TripDetailsPdf));

  return new Response(Uint8Array.from(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${TRIP_PDF_FILENAME}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
