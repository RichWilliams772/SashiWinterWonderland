"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BowIcon, SnowflakeIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { trip } from "@/data/trip";
import type { PlaylistFieldErrors, PlaylistSong } from "@/lib/playlist";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; setupIncomplete?: boolean };

export function Playlist() {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<PlaylistFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [songs, setSongs] = useState<PlaylistSong[]>([]);
  const [loadIncomplete, setLoadIncomplete] = useState(false);

  async function refreshSongs() {
    try {
      const response = await fetch("/api/playlist-songs", { cache: "no-store" });
      const data = (await response.json()) as {
        songs?: PlaylistSong[];
        setupIncomplete?: boolean;
      };
      setSongs(Array.isArray(data.songs) ? data.songs : []);
      setLoadIncomplete(Boolean(data.setupIncomplete));
    } catch {
      setSongs([]);
    }
  }

  useEffect(() => {
    void refreshSongs();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });
    setErrors({});

    try {
      const response = await fetch("/api/playlist-songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songTitle,
          artist,
          submittedBy,
          musicUrl,
          website,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        setupIncomplete?: boolean;
        alreadyListed?: boolean;
        errors?: PlaylistFieldErrors;
      };

      if (data.errors) setErrors(data.errors);

      if (response.ok && data.ok) {
        setStatus({
          kind: "success",
          message: data.message ?? trip.playlist.success,
        });
        setSongTitle("");
        setArtist("");
        setMusicUrl("");
        await refreshSongs();
        return;
      }

      setStatus({
        kind: "error",
        message: data.message ?? "Something went wrong. Please try again.",
        setupIncomplete: data.setupIncomplete,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the playlist just now. Please try again.",
      });
    }
  }

  return (
    <section id="playlist" className="scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Trip Soundtrack"
        title={trip.playlist.heading}
        subtitle={trip.playlist.subtitle}
      />

      <div className="glass-card relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] px-5 py-8 sm:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
          <SnowflakeIcon className="absolute top-4 right-5 h-5 w-5 text-rose" />
          <SnowflakeIcon className="absolute bottom-5 left-6 h-4 w-4 text-blush-deep" />
        </div>
        <BowIcon className="relative mx-auto h-8 w-14" />
        <form className="relative mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold text-ink">Song title</span>
            <input
              name="songTitle"
              value={songTitle}
              onChange={(event) => setSongTitle(event.target.value)}
              className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
              required
            />
            {errors.songTitle ? <span className="text-rose">{errors.songTitle}</span> : null}
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold text-ink">Artist</span>
            <input
              name="artist"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
              className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
              required
            />
            {errors.artist ? <span className="text-rose">{errors.artist}</span> : null}
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold text-ink">Submitted by (optional)</span>
            <input
              name="submittedBy"
              value={submittedBy}
              onChange={(event) => setSubmittedBy(event.target.value)}
              className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-semibold text-ink">Spotify or Apple Music link (optional)</span>
            <input
              name="musicUrl"
              type="url"
              inputMode="url"
              value={musicUrl}
              onChange={(event) => setMusicUrl(event.target.value)}
              placeholder="https://"
              className="min-h-12 rounded-2xl border border-rose/20 bg-white/70 px-4 text-ink"
            />
            {errors.musicUrl ? <span className="text-rose">{errors.musicUrl}</span> : null}
          </label>
          <div className="hidden" aria-hidden="true">
            <label>
              Company website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>
          </div>
          {status.kind === "success" ? (
            <p className="rounded-2xl bg-white/55 px-4 py-3 text-center text-sm text-ink" role="status">
              {status.message}
            </p>
          ) : null}
          {status.kind === "error" ? (
            <p
              className={`rounded-2xl px-4 py-3 text-sm ${
                status.setupIncomplete ? "bg-champagne/70 text-ink" : "bg-blush/60 text-ink"
              }`}
              role="alert"
            >
              {status.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status.kind === "submitting"}
            className="satin-btn min-h-12 rounded-full text-sm font-semibold text-ink disabled:opacity-70"
          >
            {status.kind === "submitting" ? "Adding…" : trip.playlist.addButton}
          </button>
        </form>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <p className="text-center text-sm font-semibold tracking-[0.18em] text-rose uppercase">
          {songs.length === 1 ? "1 song request" : `${songs.length} song requests`}
        </p>
        {songs.length === 0 ? (
          <p className="mt-4 text-center text-sm text-ink-soft">
            {loadIncomplete ? trip.playlist.setupIncomplete : trip.playlist.empty}
          </p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {songs.map((song) => (
              <li key={song.id} className="glass-card rounded-[1.6rem] px-5 py-4">
                <p className="font-display text-2xl text-ink italic">{song.songTitle}</p>
                <p className="mt-1 text-sm text-ink-soft">{song.artist}</p>
                {song.submittedBy ? (
                  <p className="mt-2 text-xs tracking-[0.12em] text-rose uppercase">
                    Added by {song.submittedBy}
                  </p>
                ) : null}
                {song.musicUrl ? (
                  <a
                    href={song.musicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-rose underline decoration-blush-deep/70 underline-offset-4"
                  >
                    Listen
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
