# Prompt2Fit

Prompt2Fit is an AI-powered stylist: describe a mood, occasion, or aesthetic in
one sentence, and it returns a complete outfit — an item-by-item breakdown, a
color palette, a styling tip, and an AI-generated lookbook visual.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs fully in **demo mode** out of the box, cycling through a set of
designed outfit concepts so it looks and works great with zero configuration.

To enable **live AI generation** (GPT-4.1-powered styling + gpt-image-1
lookbook images), copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
# then edit .env.local
OPENAI_API_KEY=sk-...
```

Restart the dev server after adding the key.

## How it works

- `POST /api/generate` takes `{ prompt }` and:
  - With an `OPENAI_API_KEY` set, asks `gpt-4.1` for a structured JSON
    outfit concept (title, vibe, 4-color palette, itemized pieces, styling
    tip), then asks `gpt-image-1` for a matching high-quality lookbook image
    (returned as a data URI — `gpt-image-1` only returns base64 images, no
    hosted URL).
  - Without a key — or if the live call fails for any reason — it falls back
    to a curated demo concept (`lib/outfitLibrary.js`) chosen deterministically
    from the prompt, so the UI never breaks or shows a dead end.
- The frontend (`pages/index.js`) always renders a full result: a real photo
  when one was generated, or an elegant palette-based "lookbook cover" built
  from the outfit's own colors when it wasn't.

## Design

The theme (`styles/globals.css`) uses Indreva's brand palette — Chrome
Silver, Platinum White, Ice Blue, Deep Blue-Grey, Steel Grey, Slate Blue,
Charcoal — for a cool, muted "metal, stone, and sky" look. The background
(`components/BackgroundFX.js`) is a looping drifting-clouds video
(`public/video/flow-bg.mp4`) over a matching gradient mesh, so the page still
looks intentional if a browser blocks video autoplay.

## Stack

Next.js (Pages Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
Lucide icons · OpenAI SDK.

## Project structure

```
components/   UI building blocks (form, result cards, background FX, etc.)
lib/          Outfit concept library, prompt templates, demo fallback logic
pages/        Routes + the /api/generate endpoint
styles/       Design tokens and global styles
```

---

© 2026 Prompt2Fit by Mohit Ningania
