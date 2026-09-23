"use client";

import { useState, type MouseEvent } from "react";
import { TRIP_PDF_FILENAME } from "@/lib/trip-pdf-filename";

export function DownloadTripPdf() {
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");

  async function onClick(event: MouseEvent<HTMLAnchorElement>) {
    const isAppleTouch = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isAppleTouch) return;

    event.preventDefault();
    setStatus("working");

    try {
      const response = await fetch("/api/trip-pdf");
      if (!response.ok) throw new Error("pdf");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = TRIP_PDF_FILENAME;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setStatus("idle");
    } catch {
      setStatus("error");
      window.location.assign("/api/trip-pdf");
    }
  }

  return (
    <a
      href="/api/trip-pdf"
      download={TRIP_PDF_FILENAME}
      onClick={onClick}
      className="satin-btn inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-ink"
    >
      {status === "working" ? "Preparing PDF…" : "Download Trip PDF 📄"}
    </a>
  );
}
