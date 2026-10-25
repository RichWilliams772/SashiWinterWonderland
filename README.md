# Sashi and Tabby’s Winter Wonderland ❄️💗

A mobile-first invitation for Sashi and Tabby’s winter getaway in Suncadia / Cle Elum, Washington.

Trip dates, prices, meals, flights, and links live in one file:

`src/data/trip.ts`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The first visit shows a sealed envelope. After someone explores the trip, the invitation stays unlocked in this browser. To preview the envelope again, clear the `sashi-wonderland-opened` key in `localStorage`.

```bash
npm run build
npm start
```

## Connect the RSVP backend

The form posts to `/api/rsvp`. Submissions are saved only after a configured backend confirms the insert. If setup is incomplete, the page says so instead of showing a fake success message.

1. Create a free [Supabase](https://supabase.com/) project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Copy the project URL and **service role** key.
4. Create a local env file:

```bash
cp .env.example .env.local
```

5. Fill in:

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
RESEND_API_KEY=YOUR_RESEND_API_KEY
RSVP_NOTIFICATION_EMAIL=you@example.com
RSVP_FROM_EMAIL=Sashi and Tabby's Winter Wonderland <beth.t@example.com>
```

6. Restart `npm run dev` and send a test RSVP.

Row Level Security stays on, with no public read policy, so the guest list is not exposed on the website.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: Next.js.
4. Add the same environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (the **service_role** / secret key, not anon or publishable)
   - `RESEND_API_KEY`
   - `RSVP_NOTIFICATION_EMAIL`
   - `RSVP_FROM_EMAIL`
5. Deploy.
6. Open the Vercel URL on your iPhone and send it to the group chat.

After deploy, send one RSVP yourself and confirm the row appears in the Supabase `rsvps` table.

## What guests see

- Estimated contribution: **$640 per paying guest**
- Includes Airbnb, car rental, groceries, liquor, and Saturday’s private chef dinner
- Flights and excursions are not included
- RSVP deadline: November 14, 2026
- The Airbnb has not been chosen yet

There is no payment deadline on the invitation. Final costs will be confirmed before payment.

## Useful edits

| Change | File |
| --- | --- |
| Dates, prices, meals, flights, links | `src/data/trip.ts` |
| RSVP table | `supabase/schema.sql` |
| Envelope, colors, snow | `src/app/globals.css` |
| Cabin photos | `public/images/` |
