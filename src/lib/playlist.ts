export type PlaylistSong = {
  id: string;
  createdAt: string;
  songTitle: string;
  artist: string;
  submittedBy: string | null;
  musicUrl: string | null;
};

export type PlaylistFieldErrors = Partial<
  Record<"songTitle" | "artist" | "submittedBy" | "musicUrl", string>
>;

const TITLE_MAX = 120;
const ARTIST_MAX = 80;
const NAME_MAX = 80;
const URL_MAX = 400;

const ALLOWED_MUSIC_HOSTS = [
  "open.spotify.com",
  "spotify.link",
  "www.spotify.com",
  "music.apple.com",
  "itunes.apple.com",
  "geo.music.apple.com",
];

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function songKey(title: string, artist: string) {
  return `${title.toLowerCase()}::${artist.toLowerCase()}`;
}

export function normalizeSongKey(title: string, artist: string) {
  return songKey(clean(title, TITLE_MAX), clean(artist, ARTIST_MAX));
}

export function isAllowedMusicUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    return ALLOWED_MUSIC_HOSTS.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

export function validatePlaylistSong(input: Record<string, unknown>): {
  ok: boolean;
  values: {
    songTitle: string;
    artist: string;
    submittedBy: string;
    musicUrl: string;
  };
  errors: PlaylistFieldErrors;
  honeypotTriggered: boolean;
} {
  const values = {
    songTitle: clean(input.songTitle, TITLE_MAX),
    artist: clean(input.artist, ARTIST_MAX),
    submittedBy: clean(input.submittedBy, NAME_MAX),
    musicUrl: clean(input.musicUrl, URL_MAX),
  };

  const errors: PlaylistFieldErrors = {};

  if (values.songTitle.length < 1) {
    errors.songTitle = "Please enter a song title.";
  }

  if (values.artist.length < 1) {
    errors.artist = "Please enter the artist name.";
  }

  if (values.musicUrl && !isAllowedMusicUrl(values.musicUrl)) {
    errors.musicUrl =
      "Please use an HTTPS Spotify or Apple Music link, or leave this blank.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    values,
    errors,
    honeypotTriggered: Boolean(String(input.website ?? "").trim()),
  };
}

export function publicPlaylistSong(row: {
  id?: unknown;
  created_at?: unknown;
  song_title?: unknown;
  artist?: unknown;
  submitted_by?: unknown;
  music_url?: unknown;
}): PlaylistSong | null {
  const songTitle = clean(row.song_title, TITLE_MAX);
  const artist = clean(row.artist, ARTIST_MAX);
  if (!songTitle || !artist) return null;

  const musicUrl = clean(row.music_url, URL_MAX);
  const submittedBy = clean(row.submitted_by, NAME_MAX);

  return {
    id: String(row.id ?? `${songTitle}-${artist}`),
    createdAt: String(row.created_at ?? ""),
    songTitle,
    artist,
    submittedBy: submittedBy || null,
    musicUrl: musicUrl && isAllowedMusicUrl(musicUrl) ? musicUrl : null,
  };
}
