"use client";

import { useEffect, useState } from "react";
import type { AdminGameIdea } from "@/lib/admin-data";
import type { PlaylistSong } from "@/lib/playlist";

type Tab = "playlist" | "games";

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

async function downloadCsv(path: string, filename: string) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error("csv");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function AdminDashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("playlist");
  const [songs, setSongs] = useState<PlaylistSong[]>([]);
  const [ideas, setIdeas] = useState<AdminGameIdea[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [playlistRes, gamesRes] = await Promise.all([
        fetch("/api/admin/playlist-songs", { cache: "no-store" }),
        fetch("/api/admin/game-ideas", { cache: "no-store" }),
      ]);
      const playlistData = (await playlistRes.json()) as { ok?: boolean; songs?: PlaylistSong[]; message?: string };
      const gamesData = (await gamesRes.json()) as { ok?: boolean; ideas?: AdminGameIdea[]; message?: string };

      if (!playlistRes.ok || !playlistData.ok || !gamesRes.ok || !gamesData.ok) {
        setError(playlistData.message || gamesData.message || "The dashboard could not be loaded.");
        return;
      }

      setSongs(playlistData.songs ?? []);
      setIdeas(gamesData.ideas ?? []);
    } catch {
      setError("The dashboard could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function removeSong(id: string) {
    if (!window.confirm("Delete this song from the playlist?")) return;
    const response = await fetch("/api/admin/playlist-songs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      setError("That song could not be deleted.");
      return;
    }
    setSongs((current) => current.filter((song) => song.id !== id));
  }

  async function removeIdea(id: string) {
    if (!window.confirm("Delete this game-night idea?")) return;
    const response = await fetch("/api/admin/game-ideas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      setError("That idea could not be deleted.");
      return;
    }
    setIdeas((current) => current.filter((idea) => idea.id !== id));
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin");
  }

  return (
    <div className="opening-bg min-h-dvh px-4 py-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="glass-card rounded-[2rem] px-5 py-6 sm:px-7">
          <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-rose uppercase">
            Private dashboard
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink italic">Wonderland Admin</h1>
          <p className="mt-2 text-sm text-ink-soft">Signed in as {email}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="/" className="rounded-full border border-rose/20 px-4 py-2 text-sm text-ink">
              View invitation
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-rose/20 px-4 py-2 text-sm text-ink"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTab("playlist")}
            className={`min-h-12 rounded-full text-sm font-semibold ${
              tab === "playlist" ? "satin-btn text-ink" : "border border-rose/20 bg-white/60 text-ink-soft"
            }`}
          >
            Playlist 🎶
          </button>
          <button
            type="button"
            onClick={() => setTab("games")}
            className={`min-h-12 rounded-full text-sm font-semibold ${
              tab === "games" ? "satin-btn text-ink" : "border border-rose/20 bg-white/60 text-ink-soft"
            }`}
          >
            Game Night 🎲
          </button>
        </div>

        {error ? (
          <p className="rounded-2xl bg-blush/60 px-4 py-3 text-sm text-ink" role="alert">
            {error}
          </p>
        ) : null}

        {loading ? <p className="text-center text-sm text-ink-soft">Loading…</p> : null}

        {tab === "playlist" ? (
          <section className="glass-card rounded-[2rem] px-5 py-6 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl text-ink italic">Playlist 🎶</h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {songs.length === 1 ? "1 song" : `${songs.length} songs`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void downloadCsv("/api/admin/playlist-songs/csv", "wonderland-playlist.csv")}
                className="satin-btn min-h-11 rounded-full px-5 text-sm font-semibold text-ink"
              >
                Download CSV
              </button>
            </div>
            {songs.length === 0 && !loading ? (
              <p className="mt-6 text-sm text-ink-soft">No playlist submissions yet.</p>
            ) : (
              <ul className="mt-6 grid gap-3">
                {songs.map((song) => (
                  <li key={song.id} className="rounded-[1.4rem] bg-white/55 px-4 py-4">
                    <p className="font-display text-2xl text-ink italic">{song.songTitle}</p>
                    <p className="mt-1 text-sm text-ink-soft">{song.artist}</p>
                    <p className="mt-2 text-xs text-ink-soft">
                      {song.submittedBy ? `Added by ${song.submittedBy}` : "No name given"}
                      {song.createdAt ? ` · ${formatDate(song.createdAt)}` : ""}
                    </p>
                    {song.musicUrl ? (
                      <a
                        href={song.musicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-sm font-semibold text-rose underline"
                      >
                        Open music link
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-ink-soft">No music link</p>
                    )}
                    <button
                      type="button"
                      onClick={() => void removeSong(song.id)}
                      className="mt-3 text-sm font-semibold text-rose"
                    >
                      Delete song
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <section className="glass-card rounded-[2rem] px-5 py-6 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl text-ink italic">Game Night 🎲</h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {ideas.length === 1 ? "1 suggestion" : `${ideas.length} suggestions`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void downloadCsv("/api/admin/game-ideas/csv", "wonderland-game-ideas.csv")}
                className="satin-btn min-h-11 rounded-full px-5 text-sm font-semibold text-ink"
              >
                Download CSV
              </button>
            </div>
            {ideas.length === 0 && !loading ? (
              <p className="mt-6 text-sm text-ink-soft">No game-night suggestions yet.</p>
            ) : (
              <ul className="mt-6 grid gap-3">
                {ideas.map((idea) => (
                  <li key={idea.id} className="rounded-[1.4rem] bg-white/55 px-4 py-4">
                    <p className="text-base text-ink">{idea.idea}</p>
                    <p className="mt-2 text-xs text-ink-soft">{formatDate(idea.createdAt)}</p>
                    <button
                      type="button"
                      onClick={() => void removeIdea(idea.id)}
                      className="mt-3 text-sm font-semibold text-rose"
                    >
                      Delete idea
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
